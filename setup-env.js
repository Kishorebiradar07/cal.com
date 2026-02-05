#!/usr/bin/env node
/**
 * Cal.com Environment Setup Helper
 * 
 * Usage: node setup-env.js
 * 
 * This script helps you create and validate .env files for local development
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function generateSecret(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function setupEnv() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║     Cal.com Environment Setup Helper       ║');
  console.log('╚════════════════════════════════════════════╝\n');

  const envPath = path.join(process.cwd(), '.env');
  const examplePath = path.join(process.cwd(), '.env.example');

  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists\n');
    const overwrite = await question('Overwrite existing .env? (y/n): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Skipping .env creation\n');
      rl.close();
      return;
    }
  }

  // Check if .env.example exists
  if (!fs.existsSync(examplePath)) {
    console.log('❌ .env.example not found in current directory\n');
    rl.close();
    process.exit(1);
  }

  console.log('📋 Let\'s set up your environment variables\n');
  console.log('Press Enter to use default values or Docker containers\n');

  // Database Configuration
  console.log('┌─ DATABASE CONFIGURATION ─┐\n');
  const dbHost = await question('Database host (default: localhost): ') || 'localhost';
  const dbPort = await question('Database port (default: 5450): ') || '5450';
  const dbUser = await question('Database user (default: unicorn_user): ') || 'unicorn_user';
  const dbPassword = await question('Database password (default: magical_password): ') || 'magical_password';
  const dbName = await question('Database name (default: calendso): ') || 'calendso';

  // NextAuth Configuration
  console.log('\n┌─ NEXTAUTH CONFIGURATION ─┐\n');
  const nextauthUrl = await question('NextAuth URL (default: http://localhost:3000): ') || 'http://localhost:3000';
  
  const generateSecret1 = await question('Generate NEXTAUTH_SECRET? (y/n): ');
  const nextauthSecret = generateSecret1.toLowerCase() === 'y' ? generateSecret() : await question('Enter NEXTAUTH_SECRET: ');
  
  const generateSecret2 = await question('Generate CALENDSO_ENCRYPTION_KEY? (y/n): ');
  const encryptionKey = generateSecret2.toLowerCase() === 'y' ? generateSecret() : await question('Enter CALENDSO_ENCRYPTION_KEY: ');

  // Webapp URLs
  console.log('\n┌─ WEBAPP CONFIGURATION ─┐\n');
  const webappUrl = await question('Web app URL (default: http://localhost:3000): ') || 'http://localhost:3000';
  const websiteUrl = await question('Website URL (default: http://localhost:3000): ') || 'http://localhost:3000';

  // Optional Configurations
  console.log('\n┌─ OPTIONAL CONFIGURATIONS ─┐\n');
  const useOptional = await question('Configure optional services? (y/n): ');
  
  let googleApiCredentials = '';
  let sendgridApiKey = '';
  let sendgridEmail = '';
  let twilioSid = '';
  let twilioToken = '';
  let dailyApiKey = '';

  if (useOptional.toLowerCase() === 'y') {
    console.log('\nGoogle Calendar Integration:');
    const googleCalendarApiKey = await question('Google Calendar API Key (or leave blank): ');
    
    console.log('\nEmail Service (SendGrid):');
    sendgridApiKey = await question('SendGrid API Key (or leave blank): ');
    sendgridEmail = await question('SendGrid Email (or leave blank): ');
    
    console.log('\nSMS Service (Twilio):');
    twilioSid = await question('Twilio Account SID (or leave blank): ');
    twilioToken = await question('Twilio Auth Token (or leave blank): ');
    
    console.log('\nVideo Conferencing (Daily.co):');
    dailyApiKey = await question('Daily API Key (or leave blank): ');
  }

  // Build the .env content
  const exampleContent = fs.readFileSync(examplePath, 'utf8');
  const envContent = exampleContent
    .replace(/DATABASE_URL="[^"]*"/, `DATABASE_URL="postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}"`)
    .replace(/DATABASE_DIRECT_URL="[^"]*"/, `DATABASE_DIRECT_URL="postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}"`)
    .replace(/NEXTAUTH_URL='[^']*'/, `NEXTAUTH_URL='${nextauthUrl}'`)
    .replace(/NEXTAUTH_SECRET=/, `NEXTAUTH_SECRET='${nextauthSecret}'`)
    .replace(/CALENDSO_ENCRYPTION_KEY=/, `CALENDSO_ENCRYPTION_KEY='${encryptionKey}'`)
    .replace(/NEXT_PUBLIC_WEBAPP_URL='[^']*'/, `NEXT_PUBLIC_WEBAPP_URL='${webappUrl}'`)
    .replace(/NEXT_PUBLIC_WEBSITE_URL='[^']*'/, `NEXT_PUBLIC_WEBSITE_URL='${websiteUrl}'`)
    .replace(/NEXT_PUBLIC_EMBED_LIB_URL='[^']*'/, `NEXT_PUBLIC_EMBED_LIB_URL='${webappUrl}/embed/embed.js'`);

  // Write .env file
  fs.writeFileSync(envPath, envContent, 'utf8');

  console.log('\n✅ .env file created successfully!\n');
  
  // Display summary
  console.log('╔════════════════════════════════════════════╗');
  console.log('║           Configuration Summary            ║');
  console.log('╚════════════════════════════════════════════╝\n');
  console.log(`Database URL: postgresql://${dbUser}:***@${dbHost}:${dbPort}/${dbName}`);
  console.log(`Web App URL: ${webappUrl}`);
  console.log(`NextAuth URL: ${nextauthUrl}`);
  console.log(`NEXTAUTH_SECRET: ${nextauthSecret.substring(0, 10)}...`);
  console.log(`CALENDSO_ENCRYPTION_KEY: ${encryptionKey.substring(0, 10)}...\n`);

  console.log('📝 Next steps:\n');
  console.log('1. Start PostgreSQL (if using Docker):');
  console.log('   docker-compose up -d\n');
  console.log('2. Install dependencies:');
  console.log('   yarn install\n');
  console.log('3. Run database migrations:');
  console.log('   yarn prisma migrate deploy\n');
  console.log('4. (Optional) Seed sample data:');
  console.log('   yarn db-seed\n');
  console.log('5. Start development server:');
  console.log('   yarn dev\n');
  console.log('6. Open browser:');
  console.log(`   ${webappUrl}\n`);

  rl.close();
}

setupEnv().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
