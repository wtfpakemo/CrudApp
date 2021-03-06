// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.basic.crudapp.domain;

import com.basic.crudapp.domain.Record;
import com.basic.crudapp.domain.RecordDataOnDemand;
import com.basic.crudapp.repo.RecordRepo;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect RecordDataOnDemand_Roo_DataOnDemand {
    
    declare @type: RecordDataOnDemand: @Component;
    
    private Random RecordDataOnDemand.rnd = new SecureRandom();
    
    private List<Record> RecordDataOnDemand.data;
    
    @Autowired
    RecordRepo RecordDataOnDemand.recordRepo;
    
    public Record RecordDataOnDemand.getNewTransientRecord(int index) {
        Record obj = new Record();
        return obj;
    }
    
    public Record RecordDataOnDemand.getSpecificRecord(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Record obj = data.get(index);
        ObjectId id = obj.getId();
        return recordRepo.findOne(id);
    }
    
    public Record RecordDataOnDemand.getRandomRecord() {
        init();
        Record obj = data.get(rnd.nextInt(data.size()));
        ObjectId id = obj.getId();
        return recordRepo.findOne(id);
    }
    
    public boolean RecordDataOnDemand.modifyRecord(Record obj) {
        return false;
    }
    
    public void RecordDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = recordRepo.findAll(new org.springframework.data.domain.PageRequest(from / to, to)).getContent();
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Record' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Record>();
        for (int i = 0; i < 10; i++) {
            Record obj = getNewTransientRecord(i);
            try {
                recordRepo.save(obj);
            } catch (final ConstraintViolationException e) {
                final StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    final ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getRootBean().getClass().getName()).append(".").append(cv.getPropertyPath()).append(": ").append(cv.getMessage()).append(" (invalid value = ").append(cv.getInvalidValue()).append(")").append("]");
                }
                throw new IllegalStateException(msg.toString(), e);
            }
            data.add(obj);
        }
    }
    
}
