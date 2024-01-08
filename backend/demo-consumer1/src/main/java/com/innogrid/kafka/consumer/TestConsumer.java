package com.innogrid.kafka.consumer;

import com.innogrid.common.model.KafkaTestVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class TestConsumer {
    @KafkaListener(id = "test-consumer", topics = "test-topic", containerFactory = "kafkaListenerContainerFactory")
    public void testListener(@Payload KafkaTestVO vo, Acknowledgment ack) {
        log.info("{}", vo);
        ack.acknowledge();
    }
}