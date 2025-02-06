const logsModel = require('../model/logsModel');

exports.getRecentLoginLogs = async (req, res) => {
    try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        twoDaysAgo.setUTCHours(0, 0, 0, 0); // Start of the day

        const today = new Date();
        today.setUTCHours(23, 59, 59, 999); // End of today

        // Fetch logs where action is either "Login" or "Logout" in the last 2 days
        const logs = await logsModel.find({
            action: { $in: ["login", "logout"] }, // Fetch both login & logout actions
            actionat: { $gte: twoDaysAgo.toISOString(), $lte: today.toISOString() }
        }).sort({ actionat: -1 }); // Sort by latest first

        res.json({ success: true, data: logs });
    } catch (err) {
        console.error("Error fetching login/logout logs:", err);
        res.status(500).json({ success: false, message: "Error fetching logs", error: err.message });
    }
};

