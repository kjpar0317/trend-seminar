package com.innogrid.demo.config;

import com.github.miemiedev.mybatis.paginator.OffsetLimitInterceptor;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.relational.core.dialect.MariaDbDialect;

import javax.sql.DataSource;

@MapperScan(value = "com.innogrid.demo.mapper", sqlSessionFactoryRef="primarySqlSessionFactory")
@Configuration
public class DBConfig {
    @ConfigurationProperties(prefix="datasource.mariadb")
    @Primary
    @Bean(name = "primaryHikariConfig")
    public HikariConfig primaryHikariConfig() {
        return new HikariConfig();
    }

    @Primary
    @Bean(name = "primaryDataSource")
    public DataSource primaryDataSource() {
        return new HikariDataSource(primaryHikariConfig());
    }

    @Primary
    @Bean(name = "primarySqlSessionFactory")
    public SqlSessionFactory sqlSessionFactory(@Qualifier("primaryDataSource") DataSource dataSource, ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setTypeAliasesPackage("com.innogrid.*.model");
        sqlSessionFactoryBean.setConfigLocation(applicationContext.getResource("classpath:mybatis/mybatis-config.xml"));
        sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:mybatis/mapper/**/*.xml"));

        OffsetLimitInterceptor offsetLimitInterceptor = new OffsetLimitInterceptor();
        offsetLimitInterceptor.setDialectClass(MariaDbDialect.class.getName());

        return sqlSessionFactoryBean.getObject();
    }

    @Primary
    @Bean(name = "primarySqlSessionTemplate")
    public SqlSessionTemplate sqlSessionTemplate(@Qualifier("primarySqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
