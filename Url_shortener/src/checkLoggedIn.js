
export const checkLoggedIn = (req, res) => {

    const user = req.user;
    

    if(!user) return res.status(401).json({
        error : "Not logged in or invalid token!!"
    })

}