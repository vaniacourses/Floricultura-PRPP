package br.com.prpp.tudosaoflores.config;

import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.enumprodutos.*;
import br.com.prpp.tudosaoflores.model.produtos.*;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ProdutoSeed implements CommandLineRunner {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public void run(String... args) {
        List<Produto> produtos = new ArrayList<>();

        // FLORES
        Flor rosa = new Flor();
        rosa.setPreco(new BigDecimal("9.90"));
        rosa.setNome("Rosa Vermelha");
        rosa.setDescricao("Rosa colombiana de alta qualidade.");
        rosa.setQuantidade(50);
        rosa.setImagem("/assets/imagens-produtos/flores/rosa-vermelha.jpg");
        rosa.setUnidadeMedida(UnidadeMedida.UNITARIO);
        rosa.setValidade(LocalDate.now().plusDays(10));
        produtos.add(rosa);

        Flor orquidea = new Flor();
        orquidea.setPreco(new BigDecimal("12.90"));
        orquidea.setNome("Orquídea Phalaenopsis");
        orquidea.setDescricao("Orquídea branca em vaso decorativo.");
        orquidea.setQuantidade(30);
        orquidea.setImagem("/assets/imagens-produtos/flores/orquidea.png");
        orquidea.setUnidadeMedida(UnidadeMedida.UNITARIO);
        orquidea.setValidade(LocalDate.now().plusDays(14));
        produtos.add(orquidea);

        Flor girassol = new Flor();
        girassol.setPreco(new BigDecimal("7.50"));
        girassol.setNome("Girassol");
        girassol.setDescricao("Girassol gigante, ideal para alegrar qualquer ambiente.");
        girassol.setQuantidade(40);
        girassol.setImagem("/assets/imagens-produtos/flores/girassol.png");
        girassol.setUnidadeMedida(UnidadeMedida.UNITARIO);
        girassol.setValidade(LocalDate.now().plusDays(8));
        produtos.add(girassol);

        Flor tulipaRosa = new Flor();
        tulipaRosa.setPreco(new BigDecimal("75.90"));
        tulipaRosa.setNome("Tulipa Rosa");
        tulipaRosa.setDescricao("Flor delicada com aparência romântica e elegante. Ideal para presentes e decoração minimalista.");
        tulipaRosa.setQuantidade(20);
        tulipaRosa.setImagem("/assets/imagens-produtos/flores/hayley-maxwell-BN0tsi5c52w-unsplash.jpg");
        tulipaRosa.setUnidadeMedida(UnidadeMedida.DUZIA);
        tulipaRosa.setValidade(LocalDate.now().plusDays(8));
        produtos.add(tulipaRosa);

        Flor anturioRosa = new Flor();
        anturioRosa.setPreco(new BigDecimal("24.90"));
        anturioRosa.setNome("Anturio Rosa");
        anturioRosa.setDescricao("Flor tropical sofisticada, com pétalas brilhantes em tom rosado e haste longa. Muito usada em arranjos modernos.");
        anturioRosa.setQuantidade(40);
        anturioRosa.setImagem("/assets/imagens-produtos/flores/pawel-czerwinski-utu66oQU6vI-unsplash.jpg");
        anturioRosa.setUnidadeMedida(UnidadeMedida.UNITARIO);
        anturioRosa.setValidade(LocalDate.now().plusDays(15));
        produtos.add(anturioRosa);

        Flor crisantemo = new Flor();
        crisantemo.setPreco(new BigDecimal("19.90"));
        crisantemo.setNome("Crisântemo Alaranjado");
        crisantemo.setDescricao("Flor volumosa em tons de salmão e laranja suave, com pétalas delicadas e visual aconchegante. Muito usada em arranjos elegantes e decoração vintage.");
        crisantemo.setQuantidade(30);
        crisantemo.setImagem("/assets/imagens-produtos/flores/ryunosuke-kikuno-38PNM7IWltk-unsplash.jpg");
        crisantemo.setUnidadeMedida(UnidadeMedida.UNITARIO);
        crisantemo.setValidade(LocalDate.now().plusDays(14));
        produtos.add(crisantemo);

        // BUQUÊS
        Buque buqueRosas = new Buque();
        buqueRosas.setPreco(new BigDecimal("79.90"));
        buqueRosas.setNome("Buquê de Rosas");
        buqueRosas.setDescricao("Buquê composto por lindas rosas vermelhas.");
        buqueRosas.setQuantidade(20);
        buqueRosas.setImagem("/assets/imagens-produtos/buques/0007_25_red_roses.jpg");
        buqueRosas.setValidade(LocalDate.now().plusDays(7));
        produtos.add(buqueRosas);

        Buque buqueCampo = new Buque();
        buqueCampo.setPreco(new BigDecimal("89.90"));
        buqueCampo.setNome("Buquê do Campo");
        buqueCampo.setDescricao("Mix de diversas flores do campo.");
        buqueCampo.setQuantidade(15);
        buqueCampo.setImagem("/assets/imagens-produtos/buques/0000_Bouquet_of_5_eustoms_in_craft.jpg");
        buqueCampo.setValidade(LocalDate.now().plusDays(6));
        produtos.add(buqueCampo);

        // ARRANJOS
        Arranjo arranjoMisto = new Arranjo();
        arranjoMisto.setPreco(new BigDecimal("109.90"));
        arranjoMisto.setNome("Arranjo Misto");
        arranjoMisto.setDescricao("Arranjo composto por orquídeas, rosas e lírios.");
        arranjoMisto.setQuantidade(8);
        arranjoMisto.setImagem("/assets/imagens-produtos/arranjos/gilberto-peralta-bocio-LR1u8jkflRE-unsplash.jpg");
        arranjoMisto.setValidade(LocalDate.now().plusDays(10));
        arranjoMisto.setVaso("SIM");
        produtos.add(arranjoMisto);

        Arranjo arranjoLuxo = new Arranjo();
        arranjoLuxo.setPreco(new BigDecimal("129.90"));
        arranjoLuxo.setNome("Arranjo Luxo");
        arranjoLuxo.setDescricao("Arranjo composto por flores pequenas e delicadas, perfeito para um ambiente minimalista.");
        arranjoLuxo.setQuantidade(10);
        arranjoLuxo.setImagem("/assets/imagens-produtos/arranjos/luxo.jpg");
        arranjoLuxo.setValidade(LocalDate.now().plusDays(10));
        arranjoLuxo.setVaso("SIM");
        produtos.add(arranjoLuxo);

        Arranjo arranjoVerao = new Arranjo();
        arranjoVerao.setPreco(new BigDecimal("79.90"));
        arranjoVerao.setNome("Arranjo Verão");
        arranjoVerao.setDescricao("Arranjo composto por diversas flores de tons quentes.");
        arranjoVerao.setQuantidade(10);
        arranjoVerao.setImagem("/assets/imagens-produtos/arranjos/verao.jpg");
        arranjoVerao.setValidade(LocalDate.now().plusDays(7));
        arranjoVerao.setVaso("SIM");
        produtos.add(arranjoVerao);

        // KITS
        Kit kitCafe = new Kit();
        kitCafe.setPreco(new BigDecimal("149.90"));
        kitCafe.setNome("Kit Café da Manhã");
        kitCafe.setDescricao("Cesta com flores, biscoitos e geléia.");
        kitCafe.setQuantidade(12);
        kitCafe.setImagem("/assets/imagens-produtos/kits/cesta-de-caf_-da-manh_-bom-dia-com-bombons.jpg");
        kitCafe.setTema("Amor");
        produtos.add(kitCafe);

        Kit kitNamorados = new Kit();
        kitNamorados.setPreco(new BigDecimal("99.90"));
        kitNamorados.setNome("Kit Dia dos Namorados");
        kitNamorados.setDescricao("Cesta flores, bombons e um ursinho de pelúcia perfeitos para presentear o amor da sua vida.");
        kitNamorados.setQuantidade(15);
        kitNamorados.setImagem("/assets/imagens-produtos/kits/Surpresa-Amor-Cesta-de-Rosas-Ferrero-Rocher-e-Chandon.jpg");
        kitNamorados.setTema("Amor");
        produtos.add(kitNamorados);

        Kit kitChocolate = new Kit();
        kitChocolate.setPreco(new BigDecimal("89.90"));
        kitChocolate.setNome("Kit Chocolatudo");
        kitChocolate.setDescricao("Cesta recheada de chocolates e bombons, perfeito para adocicar a vida.");
        kitChocolate.setQuantidade(10);
        kitChocolate.setImagem("/assets/imagens-produtos/kits/cesta_carinho_com_chocolate_e_pelucia.jpg");
        kitChocolate.setTema("Chocolate");
        produtos.add(kitChocolate);

        // FLORES SECAS
        FlorSeca lavanda = new FlorSeca();
        lavanda.setPreco(new BigDecimal("69.90"));
        lavanda.setNome("Lavanda Seca");
        lavanda.setDescricao("Maço de lavanda seca natural.");
        lavanda.setQuantidade(100);
        lavanda.setImagem("/assets/imagens-produtos/flores-secas/ana-klipper-zxYeCXxbgWc-unsplash.jpg");
        lavanda.setUnidadeMedida(UnidadeMedida.MACO);
        lavanda.setValidade(LocalDate.now().plusYears(1));
        lavanda.setProcessoSecagem(ProcessoSecagem.NATURAL_PENDURADO);
        produtos.add(lavanda);



        // CARTOES
        Cartao cartaoRomantico = new Cartao();
        cartaoRomantico.setPreco(new BigDecimal("19.90"));
        cartaoRomantico.setNome("Cartão Romântico");
        cartaoRomantico.setDescricao("Cartão com mensagem 'Te amo'.");
        cartaoRomantico.setQuantidade(60);
        cartaoRomantico.setImagem("/assets/imagens-produtos/cartoes/mega-cartao-bons-desejos-te-amo.webp");
        cartaoRomantico.setTema("Romântico");
        cartaoRomantico.setDimensoes("A5");
        produtos.add(cartaoRomantico);

        Cartao cartaoGratidao = new Cartao();
        cartaoGratidao.setPreco(new BigDecimal("14.90"));
        cartaoGratidao.setNome("Cartão Dia das Mães");
        cartaoGratidao.setDescricao("Cartão fofo com mensagem bonita feito especialmente para sua mãe.");
        cartaoGratidao.setQuantidade(40);
        cartaoGratidao.setImagem("/assets/imagens-produtos/cartoes/cartao-mae-de-coracao.webp");
        cartaoGratidao.setTema("Mãe");
        cartaoGratidao.setDimensoes("A6");
        produtos.add(cartaoGratidao);

        // Atualiza ou insere
        for (Produto p : produtos) {
            Optional<Produto> existente = produtoRepository.findByNome(p.getNome());
            if (existente.isPresent()) {
                Produto prod = existente.get();
                prod.setPreco(p.getPreco());
                prod.setDescricao(p.getDescricao());
                prod.setQuantidade(p.getQuantidade());
                prod.setImagem(p.getImagem());

                if (p instanceof Flor && prod instanceof Flor) {
                    ((Flor) prod).setUnidadeMedida(((Flor) p).getUnidadeMedida());
                    ((Flor) prod).setValidade(((Flor) p).getValidade());
                } else if (p instanceof Buque && prod instanceof Buque) {
                    ((Buque) prod).setTamanho(((Buque) p).getTamanho());
                    ((Buque) prod).setValidade(((Buque) p).getValidade());
                } else if (p instanceof Arranjo && prod instanceof Arranjo) {
                    ((Arranjo) prod).setValidade(((Arranjo) p).getValidade());
                    ((Arranjo) prod).setVaso(((Arranjo) p).getVaso());
                } else if (p instanceof Kit && prod instanceof Kit) {
                    ((Kit) prod).setTema(((Kit) p).getTema());
                } else if (p instanceof FlorSeca && prod instanceof FlorSeca) {
                    ((FlorSeca) prod).setUnidadeMedida(((FlorSeca) p).getUnidadeMedida());
                    ((FlorSeca) prod).setValidade(((FlorSeca) p).getValidade());
                    ((FlorSeca) prod).setProcessoSecagem(((FlorSeca) p).getProcessoSecagem());
                }
                produtoRepository.save(prod);
            } else {
                produtoRepository.save(p);
            }
        }
    }
}