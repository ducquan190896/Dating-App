package backend2.tinder.backend2.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import backend2.tinder.backend2.Mapper.UserMapper;
import backend2.tinder.backend2.Repository.UserRepos;
import backend2.tinder.backend2.Security.Filter.AuthenticationFilter;
import backend2.tinder.backend2.Security.Filter.ExceptionFilter;
import backend2.tinder.backend2.Security.Filter.JWTAuthorizationFilter;
import lombok.AllArgsConstructor;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
@Configuration
public class SecurityConfig {
    @Autowired
    CustomAuthenticationManager authenticationManager;
    @Autowired
    UserRepos userRepos;
    @Autowired
    ExceptionFilter exceptionFilter;
    @Autowired
    UserDetailsService userDetailsService;
    @Autowired
    UserMapper userMapper;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager, userRepos,  userMapper);
        authenticationFilter.setFilterProcessesUrl("/api/login");

        http.csrf().disable()
        .cors()
        .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http
        .authorizeHttpRequests()
        .requestMatchers("/api/users/signIn").permitAll()
        .requestMatchers("/api/users/signup").permitAll()
        .anyRequest().authenticated()
        .and()
        .addFilterBefore(exceptionFilter, authenticationFilter.getClass())
        .addFilter(authenticationFilter)
        .addFilterAfter(new JWTAuthorizationFilter(), authenticationFilter.getClass());

        http.logout().permitAll()
        .addLogoutHandler((request, response, auth) -> {
            SecurityContextHolder.getContext().setAuthentication(null);
            response.setHeader("Authorization", "");
        });

        return http.build();
    }

    @Bean 
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("*");
            }
        };
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> {
            web.ignoring().requestMatchers( "/api/users/signIn");
        };
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
