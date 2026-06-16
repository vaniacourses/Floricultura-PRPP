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

        Flor rosaBranca = new Flor();
        rosaBranca.setPreco(new BigDecimal("13.90"));
        rosaBranca.setNome("Rosa Branca");
        rosaBranca.setDescricao("Flor clássica que simboliza paz, pureza e elegância.");
        rosaBranca.setQuantidade(35);
        rosaBranca.setImagem("/assets/imagens-produtos/flores/aaron-burden-hJ-ngX9zcHk-unsplash.jpg");
        rosaBranca.setUnidadeMedida(UnidadeMedida.UNITARIO);
        rosaBranca.setValidade(LocalDate.now().plusDays(10));
        produtos.add(rosaBranca);

        Flor lirioBranco = new Flor();
        lirioBranco.setPreco(new BigDecimal("12.90"));
        lirioBranco.setNome("Lírio Branco");
        lirioBranco.setDescricao("Flor sofisticada com perfume suave e aparência elegante.");
        lirioBranco.setQuantidade(25);
        lirioBranco.setImagem("/assets/imagens-produtos/flores/camila-bustamante-VubRfL7yhwY-unsplash.jpg");
        lirioBranco.setUnidadeMedida(UnidadeMedida.UNITARIO);
        lirioBranco.setValidade(LocalDate.now().plusDays(8));
        produtos.add(lirioBranco);

        Flor gerbera = new Flor();
        gerbera.setPreco(new BigDecimal("14.90"));
        gerbera.setNome("Gérbera");
        gerbera.setDescricao("Flor vibrante e colorida que transmite alegria e energia.");
        gerbera.setQuantidade(40);
        gerbera.setImagem("/assets/imagens-produtos/flores/cody-chan-5xpY8BZaCw0-unsplash.jpg");
        gerbera.setUnidadeMedida(UnidadeMedida.DUZIA);
        gerbera.setValidade(LocalDate.now().plusDays(7));
        produtos.add(gerbera);

        Flor peonia = new Flor();
        peonia.setPreco(new BigDecimal("11.90"));
        peonia.setNome("Peônia");
        peonia.setDescricao("Flor exuberante muito apreciada por sua beleza e delicadeza.");
        peonia.setQuantidade(18);
        peonia.setImagem("/assets/imagens-produtos/flores/diana-schroder-bode-ycTgt3wE7Z4-unsplash.jpg");
        peonia.setUnidadeMedida(UnidadeMedida.UNITARIO);
        peonia.setValidade(LocalDate.now().plusDays(8));
        produtos.add(peonia);

        Flor hortensia = new Flor();
        hortensia.setPreco(new BigDecimal("12.90"));
        hortensia.setNome("Hortênsia");
        hortensia.setDescricao("Flor volumosa e charmosa ideal para decoração e presentes.");
        hortensia.setQuantidade(20);
        hortensia.setImagem("/assets/imagens-produtos/flores/edge2edge-media-6gvHkTmC3Bo-unsplash.jpg");
        hortensia.setUnidadeMedida(UnidadeMedida.UNITARIO);
        hortensia.setValidade(LocalDate.now().plusDays(9));
        produtos.add(hortensia);

        Flor dalia = new Flor();
        dalia.setPreco(new BigDecimal("14.90"));
        dalia.setNome("Dália");
        dalia.setDescricao("Flor ornamental conhecida por suas pétalas volumosas e coloridas.");
        dalia.setQuantidade(22);
        dalia.setImagem("/assets/imagens-produtos/flores/edward-howell-ywk-7XpYZus-unsplash.jpg");
        dalia.setUnidadeMedida(UnidadeMedida.UNITARIO);
        dalia.setValidade(LocalDate.now().plusDays(8));
        produtos.add(dalia);

        Flor lisianthus = new Flor();
        lisianthus.setPreco(new BigDecimal("17.90"));
        lisianthus.setNome("Lisianthus");
        lisianthus.setDescricao("Flor delicada com pétalas suaves muito utilizada em buquês.");
        lisianthus.setQuantidade(28);
        lisianthus.setImagem("/assets/imagens-produtos/flores/rebecca-F5Ndt9r_nUg-unsplash.jpg");
        lisianthus.setUnidadeMedida(UnidadeMedida.DUZIA);
        lisianthus.setValidade(LocalDate.now().plusDays(8));
        produtos.add(lisianthus);

        Flor tulipaBranca = new Flor();
        tulipaBranca.setPreco(new BigDecimal("9.90"));
        tulipaBranca.setNome("Tulipa Branca");
        tulipaBranca.setDescricao("Tulipa elegante que transmite pureza, paz e sofisticação.");
        tulipaBranca.setQuantidade(18);
        tulipaBranca.setImagem("/assets/imagens-produtos/flores/julia-zolotova-amLWcqMq3mU-unsplash.jpg");
        tulipaBranca.setUnidadeMedida(UnidadeMedida.DUZIA);
        tulipaBranca.setValidade(LocalDate.now().plusDays(8));
        produtos.add(tulipaBranca);

        Flor rosaChampagne = new Flor();
        rosaChampagne.setPreco(new BigDecimal("7.90"));
        rosaChampagne.setNome("Rosa Champagne");
        rosaChampagne.setDescricao("Rosa delicada em tons suaves para composições sofisticadas.");
        rosaChampagne.setQuantidade(30);
        rosaChampagne.setImagem("/assets/imagens-produtos/flores/olia-gozha-9A_peGrSbZc-unsplash.jpg");
        rosaChampagne.setUnidadeMedida(UnidadeMedida.UNITARIO);
        rosaChampagne.setValidade(LocalDate.now().plusDays(10));
        produtos.add(rosaChampagne);

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

        Buque buquePeoniasRosas = new Buque();
        buquePeoniasRosas.setPreco(new BigDecimal("119.90"));
        buquePeoniasRosas.setNome("Buquê de Peônias e Rosas");
        buquePeoniasRosas.setDescricao("Composição sofisticada de peônias e rosas em formato exuberante.");
        buquePeoniasRosas.setQuantidade(10);
        buquePeoniasRosas.setImagem("/assets/imagens-produtos/buques/0001_Bouquet_of_11_peony-shaped_bush_roses.jpg");
        buquePeoniasRosas.setValidade(LocalDate.now().plusDays(7));
        produtos.add(buquePeoniasRosas);

        Buque buqueRosasBrancas = new Buque();
        buqueRosasBrancas.setPreco(new BigDecimal("139.90"));
        buqueRosasBrancas.setNome("Buquê de Rosas Brancas");
        buqueRosasBrancas.setDescricao("Buquê refinado com dezenove rosas brancas em embalagem premium.");
        buqueRosasBrancas.setQuantidade(8);
        buqueRosasBrancas.setImagem("/assets/imagens-produtos/buques/0003_Bouquet_of_19_white_roses_in_a_designer_package.jpg");
        buqueRosasBrancas.setValidade(LocalDate.now().plusDays(7));
        produtos.add(buqueRosasBrancas);

        Buque buqueAlstroemerias = new Buque();
        buqueAlstroemerias.setPreco(new BigDecimal("94.90"));
        buqueAlstroemerias.setNome("Buquê de Alstroemérias");
        buqueAlstroemerias.setDescricao("Arranjo leve e colorido com alstroemérias e folhagens naturais.");
        buqueAlstroemerias.setQuantidade(14);
        buqueAlstroemerias.setImagem("/assets/imagens-produtos/buques/0004_Bouquet_of_15_alstroemeria_with_greenery_in_craft.jpg");
        buqueAlstroemerias.setValidade(LocalDate.now().plusDays(6));
        produtos.add(buqueAlstroemerias);

        Buque buquePeonias = new Buque();
        buquePeonias.setPreco(new BigDecimal("124.90"));
        buquePeonias.setNome("Buquê de Peônias");
        buquePeonias.setDescricao("Nove peônias selecionadas em um arranjo elegante e romântico.");
        buquePeonias.setQuantidade(9);
        buquePeonias.setImagem("/assets/imagens-produtos/buques/0005_Peonies_9_pieces.jpg");
        buquePeonias.setValidade(LocalDate.now().plusDays(7));
        produtos.add(buquePeonias);

        Buque buqueGirassois = new Buque();
        buqueGirassois.setPreco(new BigDecimal("84.90"));
        buqueGirassois.setNome("Buquê de Girassóis");
        buqueGirassois.setDescricao("Buquê alegre com nove girassóis vibrantes e acabamento artesanal.");
        buqueGirassois.setQuantidade(16);
        buqueGirassois.setImagem("/assets/imagens-produtos/buques/0006_Sunflowers_9_pieces.jpg");
        buqueGirassois.setValidade(LocalDate.now().plusDays(5));
        produtos.add(buqueGirassois);

        Buque buqueRosasRussas = new Buque();
        buqueRosasRussas.setPreco(new BigDecimal("159.90"));
        buqueRosasRussas.setNome("Buquê Rosas Russas");
        buqueRosasRussas.setDescricao("Arranjo premium com vinte e uma rosas vermelhas de visual marcante.");
        buqueRosasRussas.setQuantidade(6);
        buqueRosasRussas.setImagem("/assets/imagens-produtos/buques/0008_Red_Roses_Russia_21_pcs.jpg");
        buqueRosasRussas.setValidade(LocalDate.now().plusDays(7));
        produtos.add(buqueRosasRussas);

        Buque buqueDelicado = new Buque();
        buqueDelicado.setPreco(new BigDecimal("99.90"));
        buqueDelicado.setNome("Buquê Delicado");
        buqueDelicado.setDescricao("Composição suave de alstroemérias para presentear com elegância.");
        buqueDelicado.setQuantidade(13);
        buqueDelicado.setImagem("/assets/imagens-produtos/buques/0010_Bouquet_Delicate_alstroemeria.jpg");
        buqueDelicado.setValidade(LocalDate.now().plusDays(6));
        produtos.add(buqueDelicado);

        Buque buquePeoniasEucalipto = new Buque();
        buquePeoniasEucalipto.setPreco(new BigDecimal("129.90"));
        buquePeoniasEucalipto.setNome("Buquê Peônias e Eucalipto");
        buquePeoniasEucalipto.setDescricao("Peônias exuberantes combinadas com eucalipto aromático.");
        buquePeoniasEucalipto.setQuantidade(9);
        buquePeoniasEucalipto.setImagem("/assets/imagens-produtos/buques/0012_Bouquet_of_Peony-shaped_Bush_Roses_and_Eucalyptus.jpg");
        buquePeoniasEucalipto.setValidade(LocalDate.now().plusDays(7));
        produtos.add(buquePeoniasEucalipto);

        Buque buqueIris = new Buque();
        buqueIris.setPreco(new BigDecimal("109.90"));
        buqueIris.setNome("Buquê de Íris");
        buqueIris.setDescricao("Arranjo elegante com dezenove íris em embalagem sofisticada.");
        buqueIris.setQuantidade(11);
        buqueIris.setImagem("/assets/imagens-produtos/buques/0013_Bouquet_of_19_irises_in_designer_packaging.jpg");
        buqueIris.setValidade(LocalDate.now().plusDays(6));
        produtos.add(buqueIris);

        

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

        Arranjo arranjoClassico = new Arranjo();
        arranjoClassico.setPreco(new BigDecimal("119.90"));
        arranjoClassico.setNome("Arranjo Clássico");
        arranjoClassico.setDescricao("Arranjo floral refinado com flores delicadas e acabamento premium.");
        arranjoClassico.setQuantidade(6);
        arranjoClassico.setImagem("/assets/imagens-produtos/arranjos/annie-spratt-KQ6sO8m1ZDE-unsplash.jpg");
        arranjoClassico.setValidade(LocalDate.now().plusDays(12));
        arranjoClassico.setVaso("SIM");
        produtos.add(arranjoClassico);

        Arranjo arranjoPrimavera = new Arranjo();
        arranjoPrimavera.setPreco(new BigDecimal("99.90"));
        arranjoPrimavera.setNome("Arranjo Primavera");
        arranjoPrimavera.setDescricao("Mix colorido de flores frescas inspirado nas cores da primavera.");
        arranjoPrimavera.setQuantidade(10);
        arranjoPrimavera.setImagem("/assets/imagens-produtos/arranjos/e-gkBeYCbXPu8-unsplash.jpg");
        arranjoPrimavera.setValidade(LocalDate.now().plusDays(9));
        arranjoPrimavera.setVaso("SIM");
        produtos.add(arranjoPrimavera);

        Arranjo arranjoDelicado = new Arranjo();
        arranjoDelicado.setPreco(new BigDecimal("89.90"));
        arranjoDelicado.setNome("Arranjo Delicado");
        arranjoDelicado.setDescricao("Flores suaves e elegantes para decorar qualquer ambiente.");
        arranjoDelicado.setQuantidade(12);
        arranjoDelicado.setImagem("/assets/imagens-produtos/arranjos/h-ng-xuan-van-oCGA46LgCLA-unsplash.jpg");
        arranjoDelicado.setValidade(LocalDate.now().plusDays(8));
        arranjoDelicado.setVaso("NÃO");
        produtos.add(arranjoDelicado);

        Arranjo arranjoCharmoso = new Arranjo();
        arranjoCharmoso.setPreco(new BigDecimal("114.90"));
        arranjoCharmoso.setNome("Arranjo Charmoso");
        arranjoCharmoso.setDescricao("Arranjo moderno com flores selecionadas e design elegante.");
        arranjoCharmoso.setQuantidade(9);
        arranjoCharmoso.setImagem("/assets/imagens-produtos/arranjos/hanae-dan-aJaN_E2p5Tk-unsplash.jpg");
        arranjoCharmoso.setValidade(LocalDate.now().plusDays(11));
        arranjoCharmoso.setVaso("SIM");
        produtos.add(arranjoCharmoso);

        Arranjo arranjoPremium = new Arranjo();
        arranjoPremium.setPreco(new BigDecimal("149.90"));
        arranjoPremium.setNome("Arranjo Premium");
        arranjoPremium.setDescricao("Seleção premium de flores frescas para ocasiões memoráveis.");
        arranjoPremium.setQuantidade(4);
        arranjoPremium.setImagem("/assets/imagens-produtos/arranjos/irene-strong-I3w6ylm9LPg-unsplash.jpg");
        arranjoPremium.setValidade(LocalDate.now().plusDays(12));
        arranjoPremium.setVaso("SIM");
        produtos.add(arranjoPremium);

        Arranjo arranjoTropical = new Arranjo();
        arranjoTropical.setPreco(new BigDecimal("104.90"));
        arranjoTropical.setNome("Arranjo Tropical");
        arranjoTropical.setDescricao("Flores vibrantes inspiradas na beleza tropical brasileira.");
        arranjoTropical.setQuantidade(8);
        arranjoTropical.setImagem("/assets/imagens-produtos/arranjos/liana-s-7VO-qW8Mnyw-unsplash.jpg");
        arranjoTropical.setValidade(LocalDate.now().plusDays(10));
        arranjoTropical.setVaso("SIM");
        produtos.add(arranjoTropical);

        Arranjo arranjoEncantador = new Arranjo();
        arranjoEncantador.setPreco(new BigDecimal("94.90"));
        arranjoEncantador.setNome("Arranjo Encantador");
        arranjoEncantador.setDescricao("Arranjo floral leve e alegre para presentear com carinho.");
        arranjoEncantador.setQuantidade(11);
        arranjoEncantador.setImagem("/assets/imagens-produtos/arranjos/oning-QBWjm7a57qs-unsplash.jpg");
        arranjoEncantador.setValidade(LocalDate.now().plusDays(9));
        arranjoEncantador.setVaso("NÃO");
        produtos.add(arranjoEncantador);

        Arranjo arranjoSofisticado = new Arranjo();
        arranjoSofisticado.setPreco(new BigDecimal("134.90"));
        arranjoSofisticado.setNome("Arranjo Sofisticado");
        arranjoSofisticado.setDescricao("Flores selecionadas com acabamento refinado e elegante.");
        arranjoSofisticado.setQuantidade(6);
        arranjoSofisticado.setImagem("/assets/imagens-produtos/arranjos/robert-ban-0V99i6vUyhg-unsplash.jpg");
        arranjoSofisticado.setValidade(LocalDate.now().plusDays(12));
        arranjoSofisticado.setVaso("SIM");
        produtos.add(arranjoSofisticado);

        Arranjo arranjoHarmonia = new Arranjo();
        arranjoHarmonia.setPreco(new BigDecimal("109.90"));
        arranjoHarmonia.setNome("Arranjo Harmonia");
        arranjoHarmonia.setDescricao("Combinação equilibrada de flores para decorar com elegância.");
        arranjoHarmonia.setQuantidade(8);
        arranjoHarmonia.setImagem("/assets/imagens-produtos/arranjos/sarah-schilling-OvQILEwtnMw-unsplash.jpg");
        arranjoHarmonia.setValidade(LocalDate.now().plusDays(11));
        arranjoHarmonia.setVaso("SIM");
        produtos.add(arranjoHarmonia);

        Arranjo arranjoImperial = new Arranjo();
        arranjoImperial.setPreco(new BigDecimal("159.90"));
        arranjoImperial.setNome("Arranjo Imperial");
        arranjoImperial.setDescricao("Arranjo luxuoso com flores nobres e apresentação impecável.");
        arranjoImperial.setQuantidade(4);
        arranjoImperial.setImagem("/assets/imagens-produtos/arranjos/waldemar-brandt-fXc8V4S_vJw-unsplash.jpg");
        arranjoImperial.setValidade(LocalDate.now().plusDays(14));
        arranjoImperial.setVaso("SIM");
        produtos.add(arranjoImperial);

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

        Kit kitBauSonhos = new Kit();
        kitBauSonhos.setPreco(new BigDecimal("189.90"));
        kitBauSonhos.setNome("Baú dos Sonhos");
        kitBauSonhos.setDescricao("Baú especial com presentes selecionados para surpreender em ocasiões especiais.");
        kitBauSonhos.setQuantidade(8);
        kitBauSonhos.setImagem("/assets/imagens-produtos/kits/Bau-Sonhos.jpg");
        kitBauSonhos.setTema("Presente Especial");
        produtos.add(kitBauSonhos);

        Kit kitCafeFlores = new Kit();
        kitCafeFlores.setPreco(new BigDecimal("159.90"));
        kitCafeFlores.setNome("Cesta Café da Manhã com Flores");
        kitCafeFlores.setDescricao("Cesta completa com café da manhã, flores frescas e itens artesanais.");
        kitCafeFlores.setQuantidade(10);
        kitCafeFlores.setImagem("/assets/imagens-produtos/kits/cesta-cafe-da-manha-completo-com-flores-1.jpg");
        kitCafeFlores.setTema("Bom Dia");
        produtos.add(kitCafeFlores);

        Kit kitLuxoBomDia = new Kit();
        kitLuxoBomDia.setPreco(new BigDecimal("219.90"));
        kitLuxoBomDia.setNome("Cesta Luxo Bom Dia");
        kitLuxoBomDia.setDescricao("Kit premium com doces, flores e bebidas para um café da manhã inesquecível.");
        kitLuxoBomDia.setQuantidade(6);
        kitLuxoBomDia.setImagem("/assets/imagens-produtos/kits/cesta-cafe-luxo-bom-dia2.jpg");
        kitLuxoBomDia.setTema("Luxo");
        produtos.add(kitLuxoBomDia);

        Kit kitCerveja = new Kit();
        kitCerveja.setPreco(new BigDecimal("129.90"));
        kitCerveja.setNome("Kit Cervejeiro");
        kitCerveja.setDescricao("Seleção especial de cervejas e acompanhamentos para presentear.");
        kitCerveja.setQuantidade(15);
        kitCerveja.setImagem("/assets/imagens-produtos/kits/cesta-cerveja.jpg");
        kitCerveja.setTema("Cerveja");
        produtos.add(kitCerveja);

        Kit kitCoracaoMil = new Kit();
        kitCoracaoMil.setPreco(new BigDecimal("249.90"));
        kitCoracaoMil.setNome("Cesta Coração a Mil");
        kitCoracaoMil.setDescricao("Kit romântico com chocolates, flores e itens especiais para surpreender.");
        kitCoracaoMil.setQuantidade(5);
        kitCoracaoMil.setImagem("/assets/imagens-produtos/kits/Cesta-Coracao-a-Mil.jpg");
        kitCoracaoMil.setTema("Romântico");
        produtos.add(kitCoracaoMil);

        Kit kitDuetoVinhos = new Kit();
        kitDuetoVinhos.setPreco(new BigDecimal("279.90"));
        kitDuetoVinhos.setNome("Dueto de Vinhos");
        kitDuetoVinhos.setDescricao("Kit sofisticado com dois vinhos selecionados e acompanhamentos finos.");
        kitDuetoVinhos.setQuantidade(7);
        kitDuetoVinhos.setImagem("/assets/imagens-produtos/kits/cesta-duetto-de-vinhos.jpg");
        kitDuetoVinhos.setTema("Vinhos");
        produtos.add(kitDuetoVinhos);

        Kit kitCafeEspecial = new Kit();
        kitCafeEspecial.setPreco(new BigDecimal("169.90"));
        kitCafeEspecial.setNome("Café da Manhã Especial");
        kitCafeEspecial.setDescricao("Cesta recheada de delícias para começar o dia com muito carinho.");
        kitCafeEspecial.setQuantidade(9);
        kitCafeEspecial.setImagem("/assets/imagens-produtos/kits/cestacafemanhaespecial2.jpg");
        kitCafeEspecial.setTema("Café da Manhã");
        produtos.add(kitCafeEspecial);

        Kit kitMeuLove = new Kit();
        kitMeuLove.setPreco(new BigDecimal("199.90"));
        kitMeuLove.setNome("Meu Love");
        kitMeuLove.setDescricao("Kit romântico com chocolates, flores e lembranças para quem você ama.");
        kitMeuLove.setQuantidade(8);
        kitMeuLove.setImagem("/assets/imagens-produtos/kits/Meu-Love.jpg");
        kitMeuLove.setTema("Amor");
        produtos.add(kitMeuLove);

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

        FlorSeca florSeca2 = new FlorSeca();
        florSeca2.setPreco(new BigDecimal("42.50"));
        florSeca2.setNome("Bouquet Campestre Seco");
        florSeca2.setDescricao("Arranjo de flores campestres secas com tons suaves e acabamento artesanal.");
        florSeca2.setQuantidade(65);
        florSeca2.setImagem("/assets/imagens-produtos/flores-secas/basak-ze-wnZPfBXmACY-unsplash.jpg");
        florSeca2.setUnidadeMedida(UnidadeMedida.MACO);
        florSeca2.setValidade(LocalDate.now().plusYears(1));
        florSeca2.setProcessoSecagem(ProcessoSecagem.PRESERVADA_GLICERINA);
        produtos.add(florSeca2);

        FlorSeca florSeca3 = new FlorSeca();
        florSeca3.setPreco(new BigDecimal("50.90"));
        florSeca3.setNome("Lavanda Seca Premium");
        florSeca3.setDescricao("Maço de lavanda seca aromática ideal para decoração e aromatização.");
        florSeca3.setQuantidade(100);
        florSeca3.setImagem("/assets/imagens-produtos/flores-secas/bbiddac-ekWttFB0nVE-unsplash.jpg");
        florSeca3.setUnidadeMedida(UnidadeMedida.MACO);
        florSeca3.setValidade(LocalDate.now().plusYears(1));
        florSeca3.setProcessoSecagem(ProcessoSecagem.NATURAL_PENDURADO);
        produtos.add(florSeca3);

        FlorSeca florSeca5 = new FlorSeca();
        florSeca5.setPreco(new BigDecimal("46.90"));
        florSeca5.setNome("Arranjo Boho Seco");
        florSeca5.setDescricao("Mix de flores secas em estilo boho para decoração de interiores.");
        florSeca5.setQuantidade(55);
        florSeca5.setImagem("/assets/imagens-produtos/flores-secas/feey-U1FinghNs3U-unsplash.jpg");
        florSeca5.setUnidadeMedida(UnidadeMedida.DUZIA);
        florSeca5.setValidade(LocalDate.now().plusYears(1));
        florSeca5.setProcessoSecagem(ProcessoSecagem.NATURAL_PENDURADO);
        produtos.add(florSeca5);

        FlorSeca florSeca6 = new FlorSeca();
        florSeca6.setPreco(new BigDecimal("58.90"));
        florSeca6.setNome("Buquê Decorativo Seco");
        florSeca6.setDescricao("Buquê artesanal composto por flores preservadas e secas.");
        florSeca6.setQuantidade(40);
        florSeca6.setImagem("/assets/imagens-produtos/flores-secas/feey-ya74XGF97Kg-unsplash.jpg");
        florSeca6.setUnidadeMedida(UnidadeMedida.UNITARIO);
        florSeca6.setValidade(LocalDate.now().plusYears(2));
        florSeca6.setProcessoSecagem(ProcessoSecagem.NATURAL_PENDURADO);
        produtos.add(florSeca6);

        FlorSeca florSeca7 = new FlorSeca();
        florSeca7.setPreco(new BigDecimal("44.90"));
        florSeca7.setNome("Flores Silvestres Secas");
        florSeca7.setDescricao("Composição de flores silvestres secas com visual delicado.");
        florSeca7.setQuantidade(85);
        florSeca7.setImagem("/assets/imagens-produtos/flores-secas/georgia-de-lotz-grw2DRoqLAU-unsplash.jpg");
        florSeca7.setUnidadeMedida(UnidadeMedida.MACO);
        florSeca7.setValidade(LocalDate.now().plusYears(2));
        florSeca7.setProcessoSecagem(ProcessoSecagem.NATURAL_PENDURADO);
        produtos.add(florSeca7);

        FlorSeca florSeca8 = new FlorSeca();
        florSeca8.setPreco(new BigDecimal("37.50"));
        florSeca8.setNome("Mini Bouquet Seco");
        florSeca8.setDescricao("Pequeno bouquet de flores secas ideal para presentes e lembranças.");
        florSeca8.setQuantidade(120);
        florSeca8.setImagem("/assets/imagens-produtos/flores-secas/julia-shypka-AW7qhYNJQJk-unsplash.jpg");
        florSeca8.setUnidadeMedida(UnidadeMedida.UNITARIO);
        florSeca8.setValidade(LocalDate.now().plusYears(1));
        florSeca8.setProcessoSecagem(ProcessoSecagem.PRESERVADA_GLICERINA);
        produtos.add(florSeca8);

        FlorSeca florSeca9 = new FlorSeca();
        florSeca9.setPreco(new BigDecimal("63.90"));
        florSeca9.setNome("Arranjo Premium de Flores Secas");
        florSeca9.setDescricao("Arranjo sofisticado com flores secas selecionadas e acabamento refinado.");
        florSeca9.setQuantidade(30);
        florSeca9.setImagem("/assets/imagens-produtos/flores-secas/kaitlan-balsam-AQCHZvW4RG0-unsplash.jpg");
        florSeca9.setUnidadeMedida(UnidadeMedida.UNITARIO);
        florSeca9.setValidade(LocalDate.now().plusYears(2));
        florSeca9.setProcessoSecagem(ProcessoSecagem.SILICA_GEL);
        produtos.add(florSeca9);

        FlorSeca florSeca10 = new FlorSeca();
        florSeca10.setPreco(new BigDecimal("41.90"));
        florSeca10.setNome("Flores Ornamentais Secas");
        florSeca10.setDescricao("Flores secas ornamentais para vasos e composições decorativas.");
        florSeca10.setQuantidade(95);
        florSeca10.setImagem("/assets/imagens-produtos/flores-secas/katsia-jazwinska-XbGSKbYHQOU-unsplash.jpg");
        florSeca10.setUnidadeMedida(UnidadeMedida.MACO);
        florSeca10.setValidade(LocalDate.now().plusYears(2));
        florSeca10.setProcessoSecagem(ProcessoSecagem.NATURAL_PENDURADO);
        produtos.add(florSeca10);

        FlorSeca florSeca11 = new FlorSeca();
        florSeca11.setPreco(new BigDecimal("35.90"));
        florSeca11.setNome("Flores Delicadas Secas");
        florSeca11.setDescricao("Maço de flores secas leves e delicadas para decoração minimalista.");
        florSeca11.setQuantidade(110);
        florSeca11.setImagem("/assets/imagens-produtos/flores-secas/larisa-birta-G-L2T7t3kkU-unsplash.jpg");
        florSeca11.setUnidadeMedida(UnidadeMedida.MACO);
        florSeca11.setValidade(LocalDate.now().plusYears(1));
        florSeca11.setProcessoSecagem(ProcessoSecagem.PRESERVADA_GLICERINA);
        produtos.add(florSeca11);

        FlorSeca florSeca12 = new FlorSeca();
        florSeca12.setPreco(new BigDecimal("69.90"));
        florSeca12.setNome("Centro de Mesa Seco");
        florSeca12.setDescricao("Arranjo de flores secas desenvolvido para mesas e ambientes elegantes.");
        florSeca12.setQuantidade(25);
        florSeca12.setImagem("/assets/imagens-produtos/flores-secas/margaret-jaszowska-if3mBy7Y5Xs-unsplash.jpg");
        florSeca12.setUnidadeMedida(UnidadeMedida.UNITARIO);
        florSeca12.setValidade(LocalDate.now().plusYears(2));
        florSeca12.setProcessoSecagem(ProcessoSecagem.SILICA_GEL);
        produtos.add(florSeca12);

        FlorSeca florSeca13 = new FlorSeca();
        florSeca13.setPreco(new BigDecimal("54.90"));
        florSeca13.setNome("Quadro Floral Seco");
        florSeca13.setDescricao("Composição artística com flores secas preservadas para decoração.");
        florSeca13.setQuantidade(35);
        florSeca13.setImagem("/assets/imagens-produtos/flores-secas/mockup-graphics-X5I808Eo4WY-unsplash.jpg");
        florSeca13.setUnidadeMedida(UnidadeMedida.UNITARIO);
        florSeca13.setValidade(LocalDate.now().plusYears(3));
        florSeca13.setProcessoSecagem(ProcessoSecagem.PRESERVADA_GLICERINA);
        produtos.add(florSeca13);

        FlorSeca florSeca14 = new FlorSeca();
        florSeca14.setPreco(new BigDecimal("47.90"));
        florSeca14.setNome("Flores Secas Naturais");
        florSeca14.setDescricao("Seleção de flores secas naturais para decoração de longo prazo.");
        florSeca14.setQuantidade(70);
        florSeca14.setImagem("/assets/imagens-produtos/flores-secas/shuai-wang-UYpEsMsErVA-unsplash.jpg");
        florSeca14.setUnidadeMedida(UnidadeMedida.MACO);
        florSeca14.setValidade(LocalDate.now().plusYears(2));
        florSeca14.setProcessoSecagem(ProcessoSecagem.NATURAL_PENDURADO);
        produtos.add(florSeca14);

        FlorSeca florSeca15 = new FlorSeca();
        florSeca15.setPreco(new BigDecimal("43.90"));
        florSeca15.setNome("Buquê Seco Artesanal");
        florSeca15.setDescricao("Buquê de flores secas produzido artesanalmente com acabamento premium.");
        florSeca15.setQuantidade(60);
        florSeca15.setImagem("/assets/imagens-produtos/flores-secas/susan-wilkinson-ND9u8idTc3U-unsplash.jpg");
        florSeca15.setUnidadeMedida(UnidadeMedida.UNITARIO);
        florSeca15.setValidade(LocalDate.now().plusYears(2));
        florSeca15.setProcessoSecagem(ProcessoSecagem.SILICA_GEL);
        produtos.add(florSeca15);

        FlorSeca florSeca16 = new FlorSeca();
        florSeca16.setPreco(new BigDecimal("52.90"));
        florSeca16.setNome("Arranjo Floral Vintage");
        florSeca16.setDescricao("Arranjo de flores secas em estilo vintage para decoração sofisticada.");
        florSeca16.setQuantidade(45);
        florSeca16.setImagem("/assets/imagens-produtos/flores-secas/victoria-alexander-sgWyoTc-0Gc-unsplash.jpg");
        florSeca16.setUnidadeMedida(UnidadeMedida.UNITARIO);
        florSeca16.setValidade(LocalDate.now().plusYears(2));
        florSeca16.setProcessoSecagem(ProcessoSecagem.NATURAL_PENDURADO);
        produtos.add(florSeca16);


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

        Cartao cartaoChaBebe = new Cartao();
        cartaoChaBebe.setPreco(new BigDecimal("12.90"));
        cartaoChaBebe.setNome("Cartão Chá de Bebê");
        cartaoChaBebe.setDescricao("Cartão delicado para celebrar a chegada de um novo bebê.");
        cartaoChaBebe.setQuantidade(50);
        cartaoChaBebe.setImagem("/assets/imagens-produtos/cartoes/cartao_cha_bebe.png");
        cartaoChaBebe.setTema("Chá de Bebê");
        cartaoChaBebe.setDimensoes("A6");
        produtos.add(cartaoChaBebe);

        Cartao cartaoCarinho = new Cartao();
        cartaoCarinho.setPreco(new BigDecimal("9.90"));
        cartaoCarinho.setNome("Cartão Com Carinho");
        cartaoCarinho.setDescricao("Cartão elegante para transmitir carinho e afeto em qualquer ocasião.");
        cartaoCarinho.setQuantidade(80);
        cartaoCarinho.setImagem("/assets/imagens-produtos/cartoes/cartao_com_carinho.png");
        cartaoCarinho.setTema("Carinho");
        cartaoCarinho.setDimensoes("A6");
        produtos.add(cartaoCarinho);

        Cartao cartaoNatal = new Cartao();
        cartaoNatal.setPreco(new BigDecimal("15.90"));
        cartaoNatal.setNome("Cartão de Natal");
        cartaoNatal.setDescricao("Cartão festivo para enviar votos de paz, amor e felicidade no Natal.");
        cartaoNatal.setQuantidade(60);
        cartaoNatal.setImagem("/assets/imagens-produtos/cartoes/cartao_natal.png");
        cartaoNatal.setTema("Natal");
        cartaoNatal.setDimensoes("A5");
        produtos.add(cartaoNatal);

        Cartao cartaoParabens = new Cartao();
        cartaoParabens.setPreco(new BigDecimal("11.90"));
        cartaoParabens.setNome("Cartão de Parabéns");
        cartaoParabens.setDescricao("Cartão colorido ideal para aniversários e comemorações especiais.");
        cartaoParabens.setQuantidade(75);
        cartaoParabens.setImagem("/assets/imagens-produtos/cartoes/cartao_parabens.png");
        cartaoParabens.setTema("Parabéns");
        cartaoParabens.setDimensoes("A6");
        produtos.add(cartaoParabens);

        Cartao cartaoBestFriend = new Cartao();
        cartaoBestFriend.setPreco(new BigDecimal("13.90"));
        cartaoBestFriend.setNome("Cartão Melhor Amigo");
        cartaoBestFriend.setDescricao("Cartão divertido para homenagear amizades verdadeiras e duradouras.");
        cartaoBestFriend.setQuantidade(40);
        cartaoBestFriend.setImagem("/assets/imagens-produtos/cartoes/cartao-comemorativo-best-friend.webp");
        cartaoBestFriend.setTema("Amizade");
        cartaoBestFriend.setDimensoes("A6");
        produtos.add(cartaoBestFriend);

        Cartao cartaoPet = new Cartao();
        cartaoPet.setPreco(new BigDecimal("14.50"));
        cartaoPet.setNome("Cartão Pet Especial");
        cartaoPet.setDescricao("Cartão criativo para amantes de animais e momentos especiais.");
        cartaoPet.setQuantidade(35);
        cartaoPet.setImagem("/assets/imagens-produtos/cartoes/cartao-comemorativo-cachorro-chapeuzinho.webp");
        cartaoPet.setTema("Pets");
        cartaoPet.setDimensoes("A6");
        produtos.add(cartaoPet);

        Cartao cartaoCatStyle = new Cartao();
        cartaoCatStyle.setPreco(new BigDecimal("13.50"));
        cartaoCatStyle.setNome("Cartão Cat Style");
        cartaoCatStyle.setDescricao("Cartão moderno com temática felina para presentear com personalidade.");
        cartaoCatStyle.setQuantidade(45);
        cartaoCatStyle.setImagem("/assets/imagens-produtos/cartoes/cartao-comemorativo-cat-style.webp");
        cartaoCatStyle.setTema("Gatos");
        cartaoCatStyle.setDimensoes("A6");
        produtos.add(cartaoCatStyle);

        Cartao cartaoFerias = new Cartao();
        cartaoFerias.setPreco(new BigDecimal("12.50"));
        cartaoFerias.setNome("Cartão Férias Inesquecíveis");
        cartaoFerias.setDescricao("Cartão comemorativo para registrar momentos de viagem e descanso.");
        cartaoFerias.setQuantidade(30);
        cartaoFerias.setImagem("/assets/imagens-produtos/cartoes/cartao-comemorativo-maior-ferinha.webp");
        cartaoFerias.setTema("Férias");
        cartaoFerias.setDimensoes("A5");
        produtos.add(cartaoFerias);

        Cartao cartaoPai = new Cartao();
        cartaoPai.setPreco(new BigDecimal("14.90"));
        cartaoPai.setNome("Cartão Dia dos Pais");
        cartaoPai.setDescricao("Cartão especial para homenagear pais com mensagens de gratidão e carinho.");
        cartaoPai.setQuantidade(55);
        cartaoPai.setImagem("/assets/imagens-produtos/cartoes/cartao-parabens-pai.webp");
        cartaoPai.setTema("Pai");
        cartaoPai.setDimensoes("A6");
        produtos.add(cartaoPai);

        Cartao cartaoSuperMae = new Cartao();
        cartaoSuperMae.setPreco(new BigDecimal("15.90"));
        cartaoSuperMae.setNome("Cartão Super Mãe");
        cartaoSuperMae.setDescricao("Cartão afetuoso para demonstrar amor e reconhecimento às mães.");
        cartaoSuperMae.setQuantidade(50);
        cartaoSuperMae.setImagem("/assets/imagens-produtos/cartoes/cartao-super-familia-mae.webp");
        cartaoSuperMae.setTema("Mãe");
        cartaoSuperMae.setDimensoes("A6");
        produtos.add(cartaoSuperMae);

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