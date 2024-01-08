package com.innogrid.demo.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.lettuce.core.ReadFrom;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.cache.CacheKeyPrefix;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.*;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableCaching
public class RedisConfig {
    @Value("${spring.profiles.active:local}")
    private String activeProfile;

    @Value("${redis.nodes:}")
    private List<String> redisNodes;

    @Value("${redis.username:}")
    private String redisUsername;

    @Value("${redis.password:}")
    private String redisPassword;

    @Value("${redis.cache-ttl:0}")
    private int cacheTtl;

//    @Bean
//    LettuceConnectionFactory redisConnectionFactory(RedisClusterConfiguration redisConfiguration) {
//        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
//                .readFrom(ReadFrom.REPLICA_PREFERRED)
//                .commandTimeout(Duration.ofSeconds(cacheTtl))
//                .build();
//        return new LettuceConnectionFactory(redisConfiguration, clientConfig);
//    }

//    @Bean
//    RedisClusterConfiguration redisConfiguration() {
//        RedisClusterConfiguration redisClusterConfiguration = new RedisClusterConfiguration(redisNodes);
//        redisClusterConfiguration.setUsername(redisUsername);
//        redisClusterConfiguration.setPassword(redisPassword);
//        redisClusterConfiguration.setMaxRedirects(5);
//        return redisClusterConfiguration;
//    }

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        if(Arrays.asList("local", "dev").contains(activeProfile)) {
            String[] nodes = redisNodes.getFirst().split(":");
            return new LettuceConnectionFactory(new RedisStandaloneConfiguration(nodes[0], Integer.parseInt(nodes[1])));
        } else {
            RedisClusterConfiguration redisClusterConfiguration = new RedisClusterConfiguration(redisNodes);
            redisClusterConfiguration.setUsername(redisUsername);
            redisClusterConfiguration.setPassword(redisPassword);
            redisClusterConfiguration.setMaxRedirects(5);

            LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
                .readFrom(ReadFrom.REPLICA_PREFERRED)
                .commandTimeout(Duration.ofSeconds(cacheTtl))
                .build();
        return new LettuceConnectionFactory(redisClusterConfiguration, clientConfig);
        }
    }

    @Primary
    @Bean(name = "defaultCacheConfiguration")
    public RedisCacheConfiguration defaultCacheConfiguration(ObjectMapper objectMapper) {
        return RedisCacheConfiguration.defaultCacheConfig()
                .prefixCacheNameWith("%s::".formatted(activeProfile))         // 캐시명 앞에 activeProfile을 붙힘
                .entryTtl(Duration.ofSeconds(cacheTtl))
                .disableCachingNullValues()
                .serializeKeysWith(
                        RedisSerializationContext.SerializationPair.fromSerializer(
                                new StringRedisSerializer()
                        )
                )
                .serializeValuesWith(
                        RedisSerializationContext.SerializationPair.fromSerializer(
                                new GenericJackson2JsonRedisSerializer(objectMapper)
                        )
                );
    }

    /**
     * 레디스 cahcing 을 custom 하기 위해서
     *
     * @return
     */
    @Bean
    public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
        return (builder) -> builder
                .withCacheConfiguration("cacheTest2",
                        RedisCacheConfiguration.defaultCacheConfig()
                                .prefixCacheNameWith("%s::".formatted(activeProfile))
                                .entryTtl(Duration.ofMinutes(10))
                )
                .withCacheConfiguration("addCacheName",
                        RedisCacheConfiguration.defaultCacheConfig()
                                .prefixCacheNameWith("%s::".formatted(activeProfile))
                                .entryTtl(Duration.ofMinutes(5)));
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        JdkSerializationRedisSerializer jackson2JsonRedisSerializer = new JdkSerializationRedisSerializer();

        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        template.setEnableTransactionSupport(true);
        template.afterPropertiesSet();
        return template;
    }
}
