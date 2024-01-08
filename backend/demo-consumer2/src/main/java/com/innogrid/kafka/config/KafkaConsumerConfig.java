package com.innogrid.kafka.config;

import com.innogrid.common.config.KafkaConsumerDefaultConfig;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Configuration
public class KafkaConsumerConfig {
    private final KafkaConsumerDefaultConfig kafkaConsumerDefaultConfig;

    @Primary
    @Bean(name = "defaultConsumerFactory")
    public ConsumerFactory<String, Object> defaultConsumerFactory() {
        Map<String, Object> props = kafkaConsumerDefaultConfig.getDefaultKakaProps();

        // 들어오는 record 를 객체로 받기 위한 deserializer
//        JsonDeserializer<KafkaTestDTO> deserializer = new JsonDeserializer<>(KafkaTestDTO.class, false);

        return new DefaultKafkaConsumerFactory<>(props);
    }
}
