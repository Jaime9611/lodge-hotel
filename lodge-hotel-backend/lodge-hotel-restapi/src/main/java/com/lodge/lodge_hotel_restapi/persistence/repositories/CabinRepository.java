package com.lodge.lodge_hotel_restapi.persistence.repositories;

import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CabinRepository extends JpaRepository<CabinEntity, Long> {

  List<CabinEntity> findAllByMaxCapacityBetween(int min, int max);

}
