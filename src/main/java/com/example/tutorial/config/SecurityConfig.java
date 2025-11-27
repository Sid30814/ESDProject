package com.example.tutorial.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/public/**").permitAll()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll()
                )

                // GOOGLE LOGIN WITH EMAIL VALIDATION
                .oauth2Login(oauth -> oauth
                        .successHandler((request, response, authentication) -> {

                            OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
                            String email = oauthUser.getAttribute("email");

                            // ALLOWED EMAIL ONLY
                            if (!"siddheshmahajan814@gmail.com".equalsIgnoreCase(email)) {

                                // Invalidate session → block login
                                request.getSession().invalidate();

                                // Redirect to frontend with error
                                response.sendRedirect("http://localhost:3000?error=unauthorized");
                                return;
                            }

                            // If matched → login success
                            response.sendRedirect("http://localhost:3000");
                        })
                )

                .logout(logout -> logout
                        .logoutSuccessUrl("http://localhost:3000")
                        .deleteCookies("JSESSIONID")
                );

        return http.build();
    }
}
