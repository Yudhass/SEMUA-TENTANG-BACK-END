package com.belajar.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.belajar.models.entities.Product;
import com.belajar.models.repos.ProductRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductService {
    // ini adalah kelas logic / bisnis proses

    @Autowired
    private ProductRepo productRepo;

    // create dan update bisa menggunakan fungsi ini
    public Product save(Product product){
        return productRepo.save(product);
    }

    public Product findOne(Long id){
        Optional<Product> product = productRepo.findById(id);
        if (!product.isPresent()) {
            return null;
        }
        return product.get();
    }

    public Iterable<Product> findAll(){
        return productRepo.findAll();
    }

    public void deleteOne(Long id){
        productRepo.deleteById(id);
    }

    /**
     * @param nama
     * @return
     */
    public List<Product> findByNama(String nama){
        return productRepo.findByNamaContains(nama);
    }

}
