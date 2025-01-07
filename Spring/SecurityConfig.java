package com.examly.springapp.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        http.csrf().disable()
        .authorizeHttpRequests(authoriser->{
            authoriser.requestMatchers("/**").permitAll()
            .anyRequest().authenticated();
        }).httpBasic();

        return http.build();
    }
    
}
