package com.examly.springapp.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry)
    {
        registry.addMapping("/**")
        .allowedOrigins("https://8081-abdafeadf314737602eabbabbfone.premiumproject.examly.io")
        .allowedMethods("GET" , "POST" , "PUT" ,"DELETE" ,"OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);
    }
}
