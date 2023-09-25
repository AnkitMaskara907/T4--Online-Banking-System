package com.wellsfargo.training.obs;

import org.hibernate.annotations.Bag;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class OnlineBankingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineBankingSystemApplication.class, args);
	}
	@Bean
	 public WebMvcConfigurer configure() {
	  return new WebMvcConfigurer() {
	   @Override
	   public void addCorsMappings(CorsRegistry reg) {
	    reg.addMapping("/**").allowedOrigins("*");
	   }
	  };
	  
	 }
}
