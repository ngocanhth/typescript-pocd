function Styleguides() {
    return (
        <div className='container'>
           <div className="btn-primary">Button Primary</div>

           <div className="btn-secondary">Button Secondary</div>

           <form id="login-form" action="#" className="ltn__form-box contact-form-box" method="post"> 
           {/* <input type="text" name="email" placeholder="Email*">
            <input type="password" name="password" placeholder="Password*"> */} 
            <input type="hidden" name="csrfmiddlewaretoken" defaultValue="" />
            <label htmlFor="id_email">Email:</label>
            <input type="text" name="email" placeholder="Email" required id="id_email" />
            <label htmlFor="id_password">Password:</label>
            <input type="password" name="password" placeholder="Password" required id="id_password" />
            <div className="go-to-btn mt-20">
                <a href="/customers/reset_password/">
                <small>Forgot Password</small>
                </a>
            </div>
            <div className="btn-wrapper mt-0">
                <button className="btn-hollow" type="submit">Login</button>
            </div>
            </form>
        </div>
    );
}

export default Styleguides;