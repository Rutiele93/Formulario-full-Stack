package com.formulario.desafioSync360.util;

import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

public class UploadUtil {

    public static String salvarImagem(MultipartFile imagem) throws Exception {
        if (imagem.isEmpty()) {
            throw new Exception("Imagem está vazia");
        }

        String nomeArquivo = imagem.getOriginalFilename();
        String pastaUploadImagem = "C:\\Users\\rutie\\OneDrive\\Documentos\\desenvolvedor - Sync360.io\\formulario\\public\\img";
        File dir = new File(pastaUploadImagem);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        String caminhoArquivo = dir.getAbsolutePath() + File.separator + nomeArquivo;

        try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(caminhoArquivo))) {
            stream.write(imagem.getBytes());
        }

        return nomeArquivo;
    }

}
