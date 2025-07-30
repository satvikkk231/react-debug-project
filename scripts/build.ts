import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

interface BuildOptions {
  clean?: boolean;
  production?: boolean;
  watch?: boolean;
}

class ProjectBuilder {
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  private log(message: string, type: 'info' | 'success' | 'error' = 'info') {
    const colors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m',  // Green
      error: '\x1b[31m'     // Red
    };
    const reset = '\x1b[0m';
    console.log(`${colors[type]}${message}${reset}`);
  }

  private runCommand(command: string, description: string): boolean {
    try {
      this.log(`🔄 ${description}...`, 'info');
      execSync(command, { 
        stdio: 'inherit', 
        cwd: this.projectRoot 
      });
      this.log(`✅ ${description} completed!`, 'success');
      return true;
    } catch (error) {
      this.log(`❌ ${description} failed: ${error}`, 'error');
      return false;
    }
  }

  public async build(options: BuildOptions = {}): Promise<void> {
    this.log('🚀 Starting TypeScript build process...', 'info');
    
    // Check if we're in a React project
    if (!existsSync(path.join(this.projectRoot, 'package.json'))) {
      this.log('❌ No package.json found. Are you in a React project?', 'error');
      return;
    }

    // Lint the code
    const lintSuccess = this.runCommand('npm run lint', 'Linting code');
    if (!lintSuccess) {
      this.log('⚠️  Linting failed, but continuing with build...', 'info');
    }

    // Build the project
    const buildCommand = options.production ? 'npm run build' : 'npm start';
    const buildSuccess = this.runCommand(buildCommand, 'Building project');
    
    if (buildSuccess) {
      this.log('🎉 Build process completed successfully!', 'success');
      
      if (options.production) {
        this.log('📦 Production build ready for deployment', 'success');
      }
    } else {
      this.log('💥 Build process failed!', 'error');
      process.exit(1);
    }
  }

  public async deploy(): Promise<void> {
    this.log('🚀 Starting deployment process...', 'info');
    
    // Build for production first
    await this.build({ production: true });
    
    // Git operations
    this.runCommand('git add .', 'Staging changes');
    this.runCommand('git commit -m "Auto-deploy: Build update"', 'Committing changes');
    this.runCommand('git push', 'Pushing to GitHub');
    
    this.log('🌐 Deployment completed! Check your GitHub repository.', 'success');
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const builder = new ProjectBuilder();

  if (args.includes('--deploy')) {
    await builder.deploy();
  } else if (args.includes('--production')) {
    await builder.build({ production: true });
  } else {
    await builder.build();
  }
}

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default ProjectBuilder; 