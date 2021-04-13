package sys.app.ptm.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration(proxyBeanMethods=false)
public class OpenAPIConfiguration {	
	
	final String securitySchemeName = "bearerAuth";
	
	Contact contact = new Contact()
						.name("Nehemias C. Belong JR.")
						.email("nehemiasbelong@gmail.com")
						.url("https://github.com/agentorange002");

	@Bean
	public OpenAPI customConfiguration() {
		return new OpenAPI().info(new Info()
				.title("Payout Team Management")
				.version("v.0.1.0")
				.description("Payout Team Management REST API Services - BackEnd")
				.contact(contact))
				.addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
				.components(new Components().addSecuritySchemes(securitySchemeName,
						new SecurityScheme()
						.type(SecurityScheme.Type.HTTP)
						.scheme("bearer")
						.bearerFormat("JWT")));
	}

}
