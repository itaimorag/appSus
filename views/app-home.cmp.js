export default {
    template: `
        <section class="home-page">
            <h1>Welcome to <span class="logo">AppSus</span> </h1>
            <article className="apps-container">
                <router-link class="app" to="/bookApp">Books <i class="fa fa-book"></i></router-link>
                <router-link class="app" to="/noteApp">Notes <i class="fa fa-sticky-note-o"></i></router-link>
                <router-link class="app" to="/emailApp">Email <i class="fa fa-envelope-open-o"></i></router-link>
            </article>
        </section>
    `,
}
