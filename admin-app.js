class AdminApp {
    constructor() {
        this.adminPassword = 'admin123'; // Đổi mật khẩu này
        this.isLoggedIn = false;
        this.users = [];
        this.ips = [];
        this.recharges = [];
        this.setupEventListeners();
        this.loadData();
    }

    setupEventListeners() {
        // Login
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('btn-logout').addEventListener('click', () => this.logout());

        // Sidebar
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchTab(e.target.closest('.menu-item').dataset.tab));
        });

        // Users
        document.getElementById('search-users').addEventListener('input', (e) => this.searchUsers(e.target.value));
        document.getElementById('btn-add-user').addEventListener('click', () => this.showAddUserModal());

        // IPs
        document.getElementById('search-ips').addEventListener('input', (e) => this.searchIPs(e.target.value));
        document.getElementById('btn-block-ip').addEventListener('click', () => this.showBlockIPModal());

        // Recharge
        document.getElementById('btn-recharge').addEventListener('click', () => this.processRecharge());

        // Modal
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        });

        document.getElementById('btn-save-user').addEventListener('click', () => this.saveUserChanges());
        document.getElementById('btn-confirm-block').addEventListener('click', () => this.confirmBlockIP());
    }

    handleLogin(e) {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;

        if (password === this.adminPassword) {
            this.isLoggedIn = true;
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('admin-dashboard').style.display = 'flex';
            this.loadData();
        } else {
            const error = document.getElementById('login-error');
            error.textContent = '❌ Mật khẩu sai!';
            error.classList.add('show');
            setTimeout(() => error.classList.remove('show'), 3000);
        }
    }

    logout() {
        if (confirm('Bạn chắc chắn muốn logout?')) {
            this.isLoggedIn = false;
            document.getElementById('login-screen').style.display = 'flex';
            document.getElementById('admin-dashboard').style.display = 'none';
            document.getElementById('admin-password').value = '';
        }
    }

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Hide all menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(`tab-${tabName}`).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update data
        if (tabName === 'overview') this.updateOverview();
        if (tabName === 'users') this.updateUsersList();
        if (tabName === 'ips') this.updateIPsList();
        if (tabName === 'statistics') this.updateStatistics();
    }

    loadData() {
        // Load từ localStorage
        const saved = localStorage.getItem('admin_data');
        if (saved) {
            const data = JSON.parse(saved);
            this.users = data.users || [];
            this.ips = data.ips || [];
            this.recharges = data.recharges || [];
        } else {
            // Mock data
            this.createMockData();
        }
        this.updateOverview();
    }

    createMockData() {
        this.users = [
            { id: 1, name: 'Player_001', email: 'player1@example.com', gold: 500000, diamond: 10, ip: '192.168.1.100', status: 'active' },
            { id: 2, name: 'Player_002', email: 'player2@example.com', gold: 300000, diamond: 5, ip: '192.168.1.101', status: 'active' },
            { id: 3, name: 'Player_003', email: 'player3@example.com', gold: 100000, diamond: 2, ip: '192.168.1.102', status: 'blocked' }
        ];

        this.ips = [
            { ip: '192.168.1.100', user: 'Player_001', visits: 45, online: true, status: 'allow' },
            { ip: '192.168.1.101', user: 'Player_002', visits: 32, online: true, status: 'allow' },
            { ip: '192.168.1.102', user: 'Player_003', visits: 5, online: false, status: 'blocked' }
        ];

        this.recharges = [
            { date: '2024-01-15', user: 'Player_001', type: 'gold', amount: 500000, note: 'Nạp thủ công', admin: 'admin' },
            { date: '2024-01-14', user: 'Player_002', type: 'diamond', amount: 10, note: 'Quà tặng', admin: 'admin' }
        ];

        this.saveData();
    }

    saveData() {
        localStorage.setItem('admin_data', JSON.stringify({
            users: this.users,
            ips: this.ips,
            recharges: this.recharges
        }));
    }

    updateOverview() {
        const onlineIPs = this.ips.filter(ip => ip.online).length;
        const todayRecharge = this.recharges.filter(r => r.date === new Date().toISOString().split('T')[0])
            .reduce((sum, r) => sum + r.amount, 0);

        document.getElementById('total-users').textContent = this.users.length;
        document.getElementById('online-ips').textContent = onlineIPs;
        document.getElementById('today-recharge').textContent = this.formatNumber(todayRecharge);
        document.getElementById('total-games').textContent = '12,450';
    }

    updateUsersList() {
        const list = document.getElementById('users-list');
        list.innerHTML = this.users.map(user => `
            <tr>
                <td>#${user.id}</td>
                <td><strong>${user.name}</strong></td>
                <td>${user.email}</td>
                <td>${this.formatNumber(user.gold)}</td>
                <td>${user.diamond}</td>
                <td>${user.ip}</td>
                <td><span class="status-${user.status}">${user.status === 'active' ? '✅ Active' : '🚫 Blocked'}</span></td>
                <td>
                    <button class="btn-edit" onclick="adminApp.editUser(${user.id})">✏️ Edit</button>
                    <button class="btn-delete" onclick="adminApp.deleteUser(${user.id})">🗑️ Delete</button>
                </td>
            </tr>
        `).join('');
    }

    updateIPsList() {
        const list = document.getElementById('ips-list');
        list.innerHTML = this.ips.map(ip => `
            <tr>
                <td><strong>${ip.ip}</strong></td>
                <td>${ip.user}</td>
                <td>${ip.visits}</td>
                <td><span class="status-${ip.online ? 'online' : 'offline'}">${ip.online ? '🟢 Online' : '⚫ Offline'}</span></td>
                <td><span class="status-${ip.status}">${ip.status === 'allow' ? '✅ Allow' : '🚫 Blocked'}</span></td>
                <td>
                    <button class="btn-edit" onclick="adminApp.toggleIPBlock('${ip.ip}')">
                        ${ip.status === 'allow' ? '🚫 Block' : '✅ Allow'}
                    </button>
                </td>
            </tr>
        `).join('');
    }

    processRecharge() {
        const user = document.getElementById('recharge-user').value;
        const amount = parseInt(document.getElementById('recharge-amount').value);
        const type = document.getElementById('recharge-type').value;
        const note = document.getElementById('recharge-note').value;

        if (!user || !amount) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        // Cập nhật user
        const targetUser = this.users.find(u => u.name === user);
        if (targetUser) {
            if (type === 'gold') {
                targetUser.gold += amount;
            } else {
                targetUser.diamond += amount;
            }

            // Thêm lịch sử
            this.recharges.push({
                date: new Date().toISOString().split('T')[0],
                user: user,
                type: type,
                amount: amount,
                note: note,
                admin: 'admin'
            });

            this.saveData();
            alert(`✅ Nạp ${this.formatNumber(amount)} ${type === 'gold' ? 'Vàng' : 'Kim Cương'} cho ${user}`);

            // Clear form
            document.getElementById('recharge-user').value = '';
            document.getElementById('recharge-amount').value = '';
            document.getElementById('recharge-note').value = '';

            this.updateUsersList();
        } else {
            alert('❌ Không tìm thấy user!');
        }
    }

    updateStatistics() {
        const onlineUsers = this.ips.filter(ip => ip.online).length;
        document.getElementById('stat-total-users').textContent = this.users.length;
        document.getElementById('stat-online-users').textContent = onlineUsers;
        document.getElementById('stat-offline-users').textContent = this.users.length - onlineUsers;
        
        const totalGold = this.users.reduce((sum, u) => sum + u.gold, 0);
        const totalDiamond = this.users.reduce((sum, u) => sum + u.diamond, 0);
        document.getElementById('stat-total-gold').textContent = this.formatNumber(totalGold);
        document.getElementById('stat-total-diamond').textContent = totalDiamond;
    }

    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            document.getElementById('edit-username').value = user.name;
            document.getElementById('edit-email').value = user.email;
            document.getElementById('edit-gold').value = user.gold;
            document.getElementById('edit-diamond').value = user.diamond;
            document.getElementById('edit-status').value = user.status;
            document.getElementById('modal-edit-user').classList.add('active');
        }
    }

    deleteUser(userId) {
        if (confirm('Bạn chắc chắn muốn xóa user này?')) {
            this.users = this.users.filter(u => u.id !== userId);
            this.saveData();
            this.updateUsersList();
        }
    }

    toggleIPBlock(ip) {
        const ipRecord = this.ips.find(i => i.ip === ip);
        if (ipRecord) {
            ipRecord.status = ipRecord.status === 'allow' ? 'blocked' : 'allow';
            this.saveData();
            this.updateIPsList();
        }
    }

    showAddUserModal() {
        alert('Tính năng sẽ cập nhật');
    }

    showBlockIPModal() {
        document.getElementById('modal-block-ip').classList.add('active');
    }

    confirmBlockIP() {
        const ip = document.getElementById('block-ip-address').value;
        const reason = document.getElementById('block-reason').value;

        if (!ip) {
            alert('Vui lòng nhập IP');
            return;
        }

        const ipRecord = this.ips.find(i => i.ip === ip);
        if (ipRecord) {
            ipRecord.status = 'blocked';
            this.saveData();
            alert(`✅ Block IP ${ip}`);
            document.getElementById('modal-block-ip').classList.remove('active');
            this.updateIPsList();
        } else {
            alert('❌ Không tìm thấy IP!');
        }
    }

    saveUserChanges() {
        alert('✅ Lưu thay đổi thành công');
        document.getElementById('modal-edit-user').classList.remove('active');
    }

    searchUsers(query) {
        const filtered = this.users.filter(u => 
            u.name.toLowerCase().includes(query.toLowerCase()) || 
            u.email.toLowerCase().includes(query.toLowerCase())
        );
        
        const list = document.getElementById('users-list');
        list.innerHTML = filtered.map(user => `
            <tr>
                <td>#${user.id}</td>
                <td><strong>${user.name}</strong></td>
                <td>${user.email}</td>
                <td>${this.formatNumber(user.gold)}</td>
                <td>${user.diamond}</td>
                <td>${user.ip}</td>
                <td><span class="status-${user.status}">${user.status === 'active' ? '✅ Active' : '🚫 Blocked'}</span></td>
                <td>
                    <button class="btn-edit" onclick="adminApp.editUser(${user.id})">✏️ Edit</button>
                    <button class="btn-delete" onclick="adminApp.deleteUser(${user.id})">🗑️ Delete</button>
                </td>
            </tr>
        `).join('');
    }

    searchIPs(query) {
        const filtered = this.ips.filter(i => 
            i.ip.toLowerCase().includes(query.toLowerCase()) || 
            i.user.toLowerCase().includes(query.toLowerCase())
        );
        
        const list = document.getElementById('ips-list');
        list.innerHTML = filtered.map(ip => `
            <tr>
                <td><strong>${ip.ip}</strong></td>
                <td>${ip.user}</td>
                <td>${ip.visits}</td>
                <td><span class="status-${ip.online ? 'online' : 'offline'}">${ip.online ? '🟢 Online' : '⚫ Offline'}</span></td>
                <td><span class="status-${ip.status}">${ip.status === 'allow' ? '✅ Allow' : '🚫 Blocked'}</span></td>
                <td>
                    <button class="btn-edit" onclick="adminApp.toggleIPBlock('${ip.ip}')">
                        ${ip.status === 'allow' ? '🚫 Block' : '✅ Allow'}
                    </button>
                </td>
            </tr>
        `).join('');
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }
}

// Initialize
const adminApp = new AdminApp();
