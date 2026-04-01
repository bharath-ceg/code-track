import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .app-layout { display: flex; flex-direction: column; height: 100vh; background: var(--bg-deep); }
    
    .navbar { 
      background: var(--bg-panel); border-bottom: 1px solid var(--border-color);
      display: flex; justify-content: space-between; align-items: center; padding: 10px 20px;
      height: 60px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); z-index: 10; position: relative;
    }
    
    .logo { display: flex; align-items: center; gap: 10px; }
    .logo-icon { background: var(--primary); color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: 'Fira Code', monospace; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2); }
    .navbar h1 { font-size: 18px; margin: 0; color: var(--text-main); font-weight: 700; }
    .status-indicator { font-size: 12px; color: var(--success); display: flex; align-items: center; gap: 6px; font-weight: 600; }
    .status-indicator::before { content: ''; display: inline-block; width: 8px; height: 8px; background: var(--success); border-radius: 50%; box-shadow: 0 0 8px rgba(22, 163, 74, 0.5); }

    .main-workspace { display: flex; flex: 1; overflow: hidden; background: var(--bg-deep); }
    
    .pane { flex: 1; display: flex; flex-direction: column; height: 100%; border-right: 1px solid var(--border-color); }
    .editor-pane { flex: 1.5; border-right: none; background: var(--bg-editor); }
    
    .pane-header { padding: 15px 25px; border-bottom: 1px solid var(--border-color); background: var(--bg-panel); display: flex; align-items: center; gap: 10px; }
    .pane-header h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); font-weight: 700; }
    
    .badge { background: rgba(37, 99, 235, 0.1); color: var(--primary); padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 700; }
    
    .problem-list { overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px; }
    
    .problem-card {
      background: var(--bg-panel); border: 1px solid var(--border-color); padding: 18px; border-radius: 12px; cursor: pointer;
      transition: all 0.2s ease; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
    }
    .problem-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.06); border-color: rgba(37, 99, 235, 0.3); }
    .problem-card.active { border-color: var(--primary); outline: 1px solid var(--primary); }
    
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .card-header h3 { font-size: 16px; margin: 0; color: var(--text-main); }
    
    .difficulty-badge { font-size: 11px; text-transform: uppercase; font-weight: 700; padding: 4px 8px; border-radius: 6px; letter-spacing: 0.5px; }
    .difficulty-badge.easy { background: rgba(22, 163, 74, 0.1); color: var(--success); }
    .difficulty-badge.medium { background: rgba(217, 119, 6, 0.1); color: var(--warning); }
    .difficulty-badge.hard { background: rgba(220, 38, 38, 0.1); color: var(--danger); }
    
    .description { font-size: 14px; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 15px; line-height: 1.5; }
    
    .tags { display: flex; gap: 8px; flex-wrap: wrap; }
    .tag { font-size: 11px; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px; border: 1px solid #e2e8f0; font-weight: 500; }
    
    .empty-state { padding: 40px 20px; text-align: center; color: var(--text-muted); border: 1px dashed #cbd5e1; border-radius: 12px; background: #f8fafc; font-weight: 500; }
    .empty-editor { display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 15px; font-style: normal; font-weight: 500; background: var(--bg-editor); }
    
    .ide-container { display: flex; flex-direction: column; height: 100%; background: var(--bg-editor); }
    .ide-toolbar { background: var(--bg-panel); display: flex; padding: 10px 15px; border-bottom: 1px solid var(--border-color); align-items: center; }
    .window-controls { display: flex; gap: 6px; margin-right: 15px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; border: 1px solid rgba(0,0,0,0.1); }
    .dot.close { background: #ff5f56; } .dot.minimize { background: #ffbd2e; } .dot.expand { background: #27c93f; }
    .file-name { color: #64748b; font-size: 13px; font-family: 'Fira Code', monospace; font-weight: 500; }
    
    .editor-wrapper { flex: 1; padding: 1px; }
    .editor-wrapper textarea { 
      width: 100%; height: 100%; background: transparent; color: #334155; font-family: 'Fira Code', monospace; 
      font-size: 14px; padding: 25px; border: none; resize: none; overflow-y: auto; outline: none; line-height: 1.6;
    }
    .editor-wrapper textarea::placeholder { color: #94a3b8; }

    .action-bar { padding: 15px 25px; border-top: 1px solid var(--border-color); background: var(--bg-panel); display: flex; justify-content: space-between; align-items: center; }
    
    .submit-btn { background: var(--primary); color: white; border: none; padding: 10px 30px; border-radius: 8px; font-weight: 600; font-size: 14px; transition: all 0.2s; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }
    .submit-btn:hover:not([disabled]) { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4); }
    .submit-btn[disabled] { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
    
    .active-problem-tag { font-size: 13px; color: var(--primary); font-family: 'Fira Code', monospace; background: rgba(37, 99, 235, 0.1); padding: 4px 12px; border-radius: 6px; font-weight: 600; }
    
    .status-msg { opacity: 0; transform: translateY(10px); color: var(--danger); transition: all 0.3s ease; font-size: 14px; font-weight: 600; padding: 8px 16px; border-radius: 20px; background: rgba(220, 38, 38, 0.1); }
    .status-msg.success { color: var(--success); background: rgba(22, 163, 74, 0.1); }
    .status-msg.show { opacity: 1; transform: translateY(0); }
  `]
})
export class AppComponent implements OnInit {
  title = 'Student Environment';
  problems: any[] = [];
  selectedProblemId: string = '';
  selectedProblem: any = null;
  codeSubmission: string = '';
  
  isSubmitting = false;
  submitStatus = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProblems().subscribe({
      next: (data) => this.problems = data,
      error: (err) => console.error(err)
    });
  }

  selectProblem(prob: any) {
    this.selectedProblemId = prob._id;
    this.selectedProblem = prob;
    this.submitStatus = '';
    
    // Auto-fill template if empty
    if(this.codeSubmission.trim() === '') {
        this.codeSubmission = `/**\n * CodeTrack Assignment: ${prob.title}\n * Difficulty: ${prob.difficulty}\n */\n\nfunction solve(input) {\n  // Your implementation here\n  \n}\n`;
    }
  }

  submit() {
    if (!this.selectedProblemId || !this.codeSubmission.trim()) {
      this.showStatus("Error: Editor cannot be empty.", false);
      return;
    }
    
    this.isSubmitting = true;
    this.submitStatus = '';
    
    this.api.submitCode(this.selectedProblemId, this.codeSubmission).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.showStatus("Successfully Passed Checks! Status: " + res.status, true);
        setTimeout(() => this.codeSubmission = '', 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.showStatus("Submission failed to connect to compilation server.", false);
      }
    });
  }

  showStatus(msg: string, success: boolean) {
    this.submitStatus = msg;
    setTimeout(() => {
        if(this.submitStatus === msg) this.submitStatus = '';
    }, 4000);
  }
}
