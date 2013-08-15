// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.basic.crudapp.domain;

import com.basic.crudapp.domain.Record;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect Record_Roo_Json {
    
    public String Record.toJson() {
        return new JSONSerializer().exclude("*.class").deepSerialize(this);
    }
    
    public String Record.toJson(String[] fields) {
        return new JSONSerializer().include(fields).exclude("*.class").deepSerialize(this);
    }
    
    public static Record Record.fromJsonToRecord(String json) {
        return new JSONDeserializer<Record>().use(null, Record.class).deserialize(json);
    }
    
    public static String Record.toJsonArray(Collection<Record> collection) {
        return new JSONSerializer().exclude("*.class").deepSerialize(collection);
    }
    
    public static String Record.toJsonArray(Collection<Record> collection, String[] fields) {
        return new JSONSerializer().include(fields).exclude("*.class").deepSerialize(collection);
    }
    
    public static Collection<Record> Record.fromJsonArrayToRecords(String json) {
        return new JSONDeserializer<List<Record>>().use(null, ArrayList.class).use("values", Record.class).deserialize(json);
    }
    
}
