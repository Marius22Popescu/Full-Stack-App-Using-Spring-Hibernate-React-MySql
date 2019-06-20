package com.marius.config;

//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//
//	@Autowired
//	public void configureGlobalSecurity(AuthenticationManagerBuilder auth)
//			throws Exception {
//		auth.inMemoryAuthentication().withUser("b").password("12345")	//b user with pasword 12345 has acces
//				.roles("USER", "ADMIN");					//his role is USER and ADMIN
//	}
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.authorizeRequests().antMatchers("/login").permitAll()	//the /login page is the page where will be send all not authorized users
//				.antMatchers("/", "/*admin*/**").access("hasRole('USER')").and()	//set the secured URLs and which role can access them
//				.formLogin();
//	}
//}