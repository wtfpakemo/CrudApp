package com.basic.crudapp.repo;
import com.basic.crudapp.domain.Record;
import java.util.List;
import org.springframework.roo.addon.layers.repository.mongo.RooMongoRepository;

@RooMongoRepository(domainType = Record.class)
public interface RecordRepo {

    List<Record> findAll();
}
