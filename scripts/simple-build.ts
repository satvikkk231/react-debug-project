import { execSync } from 'child_process';

console.log('🚀 Starting TypeScript build process...');

try {
  // Lint the code
  console.log('🔄 Linting code...');
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting completed!');
} catch (error) {
  console.log('⚠️  Linting failed, but continuing with build...');
}

try {
  // Build the project
  console.log('🔄 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed!');
  console.log('🎉 TypeScript build process completed successfully!');
} catch (error) {
  console.log('❌ Build failed!');
  process.exit(1);
} 