package com.innogrid.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseConfigurer;

@SpringBootApplication(scanBasePackages = "com.innogrid", exclude = { DataSourceAutoConfiguration.class })
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
