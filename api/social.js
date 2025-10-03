export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    return res.status(200).json({
        success: true,
        links: {
            email: 'muhammadusman5965etc@gmail.com',
            github: 'https://github.com/MuhammadUsmanGM',
            linkedin: 'https://www.linkedin.com/in/muhammad-usman-gm',
            phone: '+92 325 6550687'
        }
    });
}