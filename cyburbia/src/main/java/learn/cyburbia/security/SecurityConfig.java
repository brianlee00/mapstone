package learn.cyburbia.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Add JwtConverter as a dependency

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    // This method allows configuring web based security for specific http requests.
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // we're not using HTML forms in our app
        //so disable CSRF (Cross Site Request Forgery)
        http.csrf().disable();

        // this configures Spring Security to allow
        //CORS related requests (such as preflight checks)
        http.cors();

        // the order of the antMatchers() method calls is important
        // as they're evaluated in the order that they're added
        http.authorizeRequests()
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/refresh_token").authenticated()
                .antMatchers(HttpMethod.GET,
                        "/api/project", "/api/project/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/location", "/api/location/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/developer", "/api/developer/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/agency", "/api/agency/*").permitAll()
                .antMatchers(HttpMethod.POST,
                        "/api/project").hasAnyRole("USER")
                .antMatchers(HttpMethod.POST,
                        "/api/location").hasAnyRole("USER")
                .antMatchers(HttpMethod.POST,
                        "/api/developer").hasAnyRole("USER")
                .antMatchers(HttpMethod.POST,
                        "/api/agency").hasAnyRole("USER")
                .antMatchers(HttpMethod.PUT,
                        "/api/project/*").hasAnyRole("USER")
                .antMatchers(HttpMethod.PUT,
                        "/api/location/*").hasAnyRole("USER")
                .antMatchers(HttpMethod.PUT,
                        "/api/developer/*").hasAnyRole("USER")
                .antMatchers(HttpMethod.PUT,
                        "/api/agency/*").hasAnyRole("USER")
                .antMatchers("/**").denyAll()
                // if we get to this point, let's deny all requests
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Autowired
    private PasswordEncoder encoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        var userBuilder = User.withUsername("user")
                .password("user").passwordEncoder(password -> encoder.encode(password))
                .roles("USER");

        var adminBuilder = User.withUsername("admin")
                .password("admin").passwordEncoder(password -> encoder.encode(password))
                .roles("ADMIN");

        auth.inMemoryAuthentication()
                .withUser(userBuilder)
                .withUser(adminBuilder);
    }

}