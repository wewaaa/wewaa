package com.wewaa.backend;

import com.wewaa.backend.commons.config.properties.AppProperties;
import com.wewaa.backend.commons.config.properties.CorsProperties;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        CorsProperties.class,
        AppProperties.class
})
public class BackendApplication {

    public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.yml,"
            + "classpath:aws.yml";

    public static void main(String[] args) {
        new SpringApplicationBuilder(BackendApplication.class)
                .properties(APPLICATION_LOCATIONS)
                .run(args);
    }
}
