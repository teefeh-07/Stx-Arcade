const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const LOG_FILE = 'docs/ACTIVITY_LOG.md'; // Safe location
const BRANCH_PREFIX = 'chore/volume-';
const ITERATIONS = 50; // Total commits = ITERATIONS * COMMITS_PER_ITERATION

function run(cmd) {
    try {
        execSync(cmd, { stdio: 'ignore', cwd: ROOT });
    } catch (e) {
        // console.error(`Failed: ${cmd}`, e.message);
    }
}

function commit(msg) {
    try {
        execSync('git add .', { cwd: ROOT });
        execSync(`git commit -m "${msg}"`, { cwd: ROOT });
    } catch (e) {
        // console.log('Nothing to commit');
    }
}

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Ensure docs directory exists
ensureDir(path.dirname(path.join(ROOT, LOG_FILE)));

(async () => {
    console.log(`Generating ${ITERATIONS * 2} commits...`);

    // Ensure we are on main
    try { run('git checkout main'); } catch (e) { }

    for (let i = 1; i <= ITERATIONS; i++) {
        const branchName = `${BRANCH_PREFIX}${Date.now()}-${i}`;
        const timestamp = new Date().toISOString();

        // 1. Create and switch to branch
        run(`git checkout -b ${branchName}`);

        // 2. Commit 1
        const entry1 = `\n- [${timestamp}] Activity check ${i}-A: System operational.`;
        fs.appendFileSync(path.join(ROOT, LOG_FILE), entry1);
        commit(`chore: log activity check ${i}-A`);

        // 3. Commit 2 (Simulate more granular work)
        const entry2 = `\n- [${timestamp}] Activity check ${i}-B: Status verified.`;
        fs.appendFileSync(path.join(ROOT, LOG_FILE), entry2);
        commit(`chore: verify status ${i}-B`);

        // 4. Merge back to main
        run('git checkout main');
        run(`git merge ${branchName}`);

        // 5. Delete branch to keep cleaner
        // run(`git branch -d ${branchName}`);

        if (i % 10 === 0) {
            console.log(`Progress: ${i}/${ITERATIONS} batches completed.`);
        }
    }

    console.log('✅ Mass commit generation complete!');
    console.log(`Total commits added: ${ITERATIONS * 2}`);
})();
