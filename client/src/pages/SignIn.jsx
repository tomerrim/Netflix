export const SignIn = () => {
    return (
        <>
            <h1>Sign In</h1>
            <form action="">
                <div>
                    <label htmlFor="email">Email:</label><br />
                    <input type="text" id="email" name="email"/>
                </div>
                <div>
                    <label htmlFor="name">Name:</label><br />
                    <input type="text" id="name" name="name"/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password"/>
                </div>

            </form>
        </>
    )
}