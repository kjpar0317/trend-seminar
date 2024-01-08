package com.innogrid.common.config;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Configuration
public class KafkaConsumerDefaultConfig {
    @Value("${spring.kafka.bootstrap-servers:}")
    private List<String> bootstrapServer;

//    @Value("${spring.kafka.consumer.group-id:}")
//    private String groupId;

    @Value("${spring.kafka.consumer.enable-auto-commit:false}")
    private boolean enableAutoCommit;

    @Value("${spring.kafka.consumer.auto-offset-reset:earliest}")
    private String autoOffsetResetConfig;

    public Map<String, Object> getDefaultKakaProps() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, this.bootstrapServer);
//        props.put(ConsumerConfig.GROUP_ID_CONFIG, this.groupId);
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, this.enableAutoCommit);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, this.autoOffsetResetConfig);
        props.put(JsonDeserializer.VALUE_DEFAULT_TYPE, "java.util.HashMap");
        props.put(JsonDeserializer.USE_TYPE_INFO_HEADERS, false);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        props.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, 5000); // poll 요청을 보내고, 다음 poll 요청을 보내는데 까지의 최대 시간 설정

        return props;
    }
}
