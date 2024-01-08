package com.innogrid.kafka.consumer.config;

import com.innogrid.common.config.KafkaConsumerDefaultConfig;
import com.innogrid.common.model.KafkaTestVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.util.backoff.FixedBackOff;

import java.io.IOException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class TestConsumerFactory {
    private final KafkaConsumerDefaultConfig kafkaConsumerDefaultConfig;

    public ConsumerFactory<String, KafkaTestVO> testConsumerFactory() {
        Map<String, Object> props = kafkaConsumerDefaultConfig.getDefaultKakaProps();

        return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), new JsonDeserializer<>(KafkaTestVO.class));
    }

    @Bean(name = "testListenerContainerFactory")
    public ConcurrentKafkaListenerContainerFactory<String, KafkaTestVO> testListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, KafkaTestVO> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(testConsumerFactory());
        factory.setCommonErrorHandler(testConsumerErrorHandler());
        return factory;
    }

    // 수신하는 consumer 에서 record를 필터링할 수 있습니다.
//    @Bean
//    public ConcurrentKafkaListenerContainerFactory<String, KafkaTestDTO> filterListenerContainerFactory() {
//        ConcurrentKafkaListenerContainerFactory<String, KafkaTestDTO> factory = new ConcurrentKafkaListenerContainerFactory<>();
//        factory.setConsumerFactory(consumerFactory);
////        factory.setRecordFilterStrategy(record -> Integer.parseInt(record.value().getAge()) > 30); // 필터링
//        return factory;
//    }

    private DefaultErrorHandler testConsumerErrorHandler() {
        DefaultErrorHandler errorHandler = new DefaultErrorHandler((consumerRecord, exception) -> {
            log.error("[Error] topic = {}, key = {}, value = {}, error message = {}", consumerRecord.topic(),
                    consumerRecord.key(), consumerRecord.value(), exception.getMessage());
        }, new FixedBackOff(1000L, 10)); // 1초 간격으로 최대 10번

        errorHandler.addNotRetryableExceptions(IOException.class); // retry X

        return errorHandler;
    }
}

