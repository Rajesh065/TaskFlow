/**
 * TaskFlow Pro - LocalStorage Persistence Layer
 */

const Storage = {
    KEYS: {
        projects: 'taskflow_projects',
        tasks: 'taskflow_tasks',
        team: 'taskflow_team',
        settings: 'taskflow_settings'
    },

    /**
     * Initialize storage with default data if empty
     */
    init() {
        if (!localStorage.getItem(this.KEYS.projects)) {
            localStorage.setItem(this.KEYS.projects, JSON.stringify(INITIAL_PROJECTS));
        }
        if (!localStorage.getItem(this.KEYS.tasks)) {
            localStorage.setItem(this.KEYS.tasks, JSON.stringify(INITIAL_TASKS));
        }
        if (!localStorage.getItem(this.KEYS.team)) {
            localStorage.setItem(this.KEYS.team, JSON.stringify(INITIAL_TEAM));
        }
        if (!localStorage.getItem(this.KEYS.settings)) {
            localStorage.setItem(this.KEYS.settings, JSON.stringify({
                theme: 'light',
                notifications: true,
                emailDigest: true,
                compactView: false
            }));
        }
    },

    getProjects() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.projects)) || [];
        } catch {
            return [...INITIAL_PROJECTS];
        }
    },

    saveProjects(projects) {
        localStorage.setItem(this.KEYS.projects, JSON.stringify(projects));
    },

    getTasks() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.tasks)) || [];
        } catch {
            return [...INITIAL_TASKS];
        }
    },

    saveTasks(tasks) {
        localStorage.setItem(this.KEYS.tasks, JSON.stringify(tasks));
    },

    getTeam() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.team)) || [];
        } catch {
            return [...INITIAL_TEAM];
        }
    },

    getSettings() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.settings)) || {};
        } catch {
            return {};
        }
    },

    saveSettings(settings) {
        localStorage.setItem(this.KEYS.settings, JSON.stringify(settings));
    },

    /**
     * Add a new task
     */
    addTask(task) {
        const tasks = this.getTasks();
        tasks.unshift(task);
        this.saveTasks(tasks);
        return task;
    },

    /**
     * Update existing task
     */
    updateTask(id, updates) {
        const tasks = this.getTasks();
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) return null;
        tasks[index] = { ...tasks[index], ...updates };
        this.saveTasks(tasks);
        return tasks[index];
    },

    /**
     * Delete task
     */
    deleteTask(id) {
        let tasks = this.getTasks();
        tasks = tasks.filter(t => t.id !== id);
        this.saveTasks(tasks);
    },

    /**
     * Get task by id
     */
    getTask(id) {
        return this.getTasks().find(t => t.id === id);
    },

    /**
     * Get project by id
     */
    getProject(id) {
        return this.getProjects().find(p => p.id === id);
    },

    /**
     * Get user by id
     */
    getUser(id) {
        return this.getTeam().find(u => u.id === id);
    },

    /**
     * Reset all data to initial state
     */
    reset() {
        localStorage.setItem(this.KEYS.projects, JSON.stringify(INITIAL_PROJECTS));
        localStorage.setItem(this.KEYS.tasks, JSON.stringify(INITIAL_TASKS));
        localStorage.setItem(this.KEYS.team, JSON.stringify(INITIAL_TEAM));
        Utils.showToast('Data reset to defaults', 'success');
    }
};
