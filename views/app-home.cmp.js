export default {
    template: `
        <section class="home-page">
            <h1>Welcome to AppSus</h1>
            <article className="apps-container debug">
                <router-link class="app" to="/bookApp">book</router-link>
                <router-link class="app" to="/noteApp">note</router-link>
                <router-link class="app" to="/emailApp">email</router-link>
            </article>
        </section>
    `,
}
