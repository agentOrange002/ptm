package sys.app.ptm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import sys.app.ptm.security.ApplicationProperties;

@SpringBootApplication(proxyBeanMethods = false)
public class PtmApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(PtmApplication.class, args);
		/*
		 * ApplicationContext ctx = SpringApplication.run(PtmApplication.class, args);
		 * 
		 * System.out.println("Let's inspect the beans provided by Spring Boot:");
		 * 
		 * String[] beanNames = ctx.getBeanDefinitionNames(); Arrays.sort(beanNames);
		 * for (String beanName : beanNames) { System.out.println(beanName); }
		 */
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SpringApplicationContext springApplicationContext() {
		return new SpringApplicationContext();
	}

	@Bean(name = "AppProperties")
	public ApplicationProperties getAppProperties() {
		return new ApplicationProperties();
	}

}
