export const profile = (req, res) => {
    try {
        res.status(200).json('ok');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
