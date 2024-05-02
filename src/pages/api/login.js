// import fetch from 'node-fetch'; // Assuming you're running this in a Node.js environment
import cookie from 'cookie';

const LoginPOST = async (req, res) => {
    if (req.method === 'POST') {
        const { userName, password } = req.body;
        const body = JSON.stringify({
            username: userName,
            password: password,
        });

        try {
            const apiRes = await fetch(`https://dev-api.qwqer.pk/api/auth/merchant/login/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            const data = await apiRes.json();

            if (apiRes.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', data.access, {
                            httpOnly: true,
                            secure: true, // Assuming your application is served over HTTPS
                            maxAge: 60 * 30,
                            sameSite: 'strict',
                            path: '/api/',
                        }
                    ),
                    cookie.serialize(
                        'refresh', data.refresh, {
                            httpOnly: true,
                            secure: true, // Assuming your application is served over HTTPS
                            maxAge: 60 * 60 * 24,
                            sameSite: 'strict',
                            path: '/api/',
                        }
                    ),
                ]);

                try {
                    const veriapi = await fetch(`https://dev-api.qwqer.pk/api/auth/verify/`, {
                        method: 'POST',
                        headers: {
                            "Authorization": `JWT ${data.access}`, // Corrected the Authorization header
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            token: data.access 
                        })
                    });                                                                                                                                   

                    if (veriapi.status === 200) {

                        const verdata= await veriapi.json()
                        console.log(verdata)

                        try {
                            const userapi = await fetch(`https://dev-api.qwqer.pk/api/auth/merchant/user/info/`, {
                                method: 'GET',
                                headers: {
                                    "Authorization": `JWT ${data.access}`, 
                                    'Content-Type': 'application/json',
                                },
                            })

                            const userdata = await userapi.json();
                            console.log(userdata);
                            if (userapi.status === 200) {
                                return res.status(200).json({
                                    success: 'Logged in successfully',
                                    userdata, // Include userdata in the response
                                });
                            }else{
                                return res.status(userapi.status).json({
                                    error: 'Authentication not verified'
                                });
                            }
                        } catch (error) {
                            console.error('Error during verify:', error.response);
                    return res.status(500).json({
                        error: 'Something went wrong when authenticating verify'
                    });
                        }

                        return res.status(200).json({
                            success: 'Logged in successfully'
                        });
                    } else {
                        return res.status(veriapi.status).json({
                            error: 'Authentication not verified'
                        });
                    }
                } catch (error) {
                    console.error('Error during verify:', error.response);
                    return res.status(500).json({
                        error: 'Something went wrong when authenticating verify'
                    });
                }
            } else {
                return res.status(apiRes.status).json({
                    error: 'Authentication failed'
                });
            }
        } catch (error) {
            console.error('Error during authentication:', error.response);
            return res.status(500).json({
                error: 'Something went wrong when authenticating'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `method ${req.method} not allowed` });
    }
};

export default LoginPOST;
