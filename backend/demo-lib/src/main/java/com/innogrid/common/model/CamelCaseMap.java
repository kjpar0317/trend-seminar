package com.innogrid.common.model;

import com.google.common.base.CaseFormat;

import java.util.HashMap;

//@Alias("CamelCaseMap")
public class CamelCaseMap extends HashMap<String, Object> {
    @Override
    public Object put(String key, Object value) {
        return super.put(toLowerCamel(key), value);
    }

    private static String toLowerCamel(String key) {
        return CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL, key);
    }
}
