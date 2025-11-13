import React from 'react';
import styled from 'styled-components';
import WithUser from '../../containers/withUser';

const NormalLinkWrapper = styled.a`
  color: ${props => props.theme.artz.primaryColor};
  text-decoration: underline;
  transition: all .25s ease;
  
  &:hover{
    color: #9c3905;
  }
`;

const WarningNotice = styled.p`
  color: red;
`;


const ConditionsFR = (
  <div>
    <h2>
      CONDITIONS D’UTILISATION
    </h2>
    <p className="text-center">
      <strong>
        <em>*Veuillez lire attentivement les modalités ci-dessous.</em>
      </strong>
    </p>

    <h5>1 - Définitions</h5>
    <p>
      <strong>« Artizyou &copy; »</strong> désigne la société Artizyou &copy; Inc., dont les bureaux sont situés au 118 rue
        Nicholson, à Salaberry-de-Valleyfield, province de Québec, J6T 4N4, ainsi qu’à ses filiales, sociétés affiliées
        et sociétés remplaçantes.
    </p>
    <p>
      <strong>« Créations »</strong> désigne les créations et toute propriété intellectuelle appartenant à l’Utilisateur
        et soumis à Artizyou &copy; dans le cadre de l’Utilisation du Site Web, notamment tout objet physique ou numérique,
        ou d'autres propriétés ou services numériques ou pouvant être représentés numériquement (par exemple, des photos,
        images, fichiers 3D-STL, textes, musique, vidéos, etc.).
    </p>
    <p>
      <strong>« Information Personnelle »</strong> désigne les informations d’identification personnelle et l’ensemble
        ou groupes de données associés aux renseignements d’identification personnelle de l’Utilisateur de manière à
        permettre de l’identifier rapidement et facilement, à l’exclusion des Informations Personnelle que l’Utilisateur
        décide d’afficher dans les sections publiques du Site Web.
    </p>
    <p>
      <strong>« Personne »</strong> désigne, selon le cas, un particulier, une société de personnes, une société par
        actions, une compagnie, une coopérative, une association ou toute autre organisation possédant ou non une
        personnalité juridique propre.
    </p>
    <p>
      <strong>« Site Web »</strong> désigne le site Web de Artizyou &copy; accessible au <NormalLinkWrapper
      href="https://www.artizyou.com">www.artizyou.com</NormalLinkWrapper>,
      ainsi qu’aux fonctions, applications, services ou sites Web associés.
    </p>
    <p>
      <strong>« Utilisateur »</strong> désigne la Personne utilisant les services offerts par
      Artizyou &copy; par l’entremise de son Site Web.
    </p>

    <h5>2 - Généralités</h5>
    <p>
      Artizyou &copy; est une plateforme en ligne permettant d’enregistrer et transférer vos droits
      de propriété intellectuelle, notamment sur vos droits d’auteurs, le tout via la technologie
      blockchain. De plus, Artizyou &copy; permet aux Utilisateurs de communiquer entre eux afin d’obtenir
      une cession ou une licence d’utilisation des Créations des autres Utilisateurs. Artizyou &copy; entretient
      son Site Web afin d’améliorer l’accès pour tous les Utilisateurs à des informations sur les
      produits, services, projets, outils et autres informations du domaine du droit d’auteurs
      dans le monde entier.
    </p>
    <p>
      De façon générale, Artizyou &copy; ne vous permet pas de transférer directement des sommes d’argent
      via son Site Web et ne permet l’utilisation de la blockchain que dans l’objectif d’enregistrer
      une preuve d’antériorité de vos droits.
    </p>

    <h5>3 - Conditions d’utilisation</h5>
    <p>
      Artizyou &copy; offre à l’Utilisateur l’accès et l’utilisation du Site Web à la condition que ce
      dernier accepte sans modifications les modalités, conditions et exclusions énoncées aux présentes.
    </p>
    <p>
      En utilisant le Site Web et son contenu, l’Utilisateur accepte expressément les présentes conditions
      d’utilisation. La collecte, l’utilisation et la communication d’Information Personnelle par Artizyou &copy; par
      l’entremise de son Site Web sont assujetties à la Politique de confidentialité de Artizyou &copy;.
    </p>
    <p>
        En acceptant les présents termes et conditions, l’Utilisateur consent à la collecte, à l’utilisation et au
        traitement  d’Information Personnelle conformément à notre Politique de confidentialité et dans le cadre du
        respect de la réglementation en vigueur en Suisse.
    </p>
    <p>
        Tout Utilisateur doit être âgé de 18 ans et plus, ou détenir l’approbation de son tuteur légal, afin d’utiliser
        le Site Web et les services d’Artizyou &copy;.
    </p>

    <h5>4 - Soumission de contenu et Créations</h5>
    <p>
        L’Utilisateur reconnaît que toutes les informations, (y compris et sans limitation les informations ou le
        contenu fournis lors de l’enregistrement d’une Création), données, textes, fichiers, images, graphiques, vidéos,
        messages, logos ou autres fichiers, qu’ils soient affichés sur ce Site Web (y compris les forums ou autres zones
        publiques) ou transmis en privé par le biais de ce Site Web, n’appartiennent pas à Artizyou &copy; et qu’ils sont de
        la responsabilité de l’Utilisateur dont ils proviennent, que ces informations soient transmises pour Artizyou &copy;,
        d’autres Utilisateurs, fournisseurs ou prestataires.
    </p>
    <p>
      L’Utilisateur, et non Artizyou &copy; ou ses affiliés, reconnait être entièrement responsable de tout contenu
      et Création que ce dernier télécharge, publie, liste, enregistre, envoi par email, transmet ou rend disponible
      via ce Site Web, qui agit comme un conduit passif pour l’enregistrement et le transfert des Créations.
    </p>
    <p>
      L’Utilisateur est responsable du contenu de l'information divulguée dans le cadre de l'utilisation
      de ce Site Web, laquelle information ne doit en aucun temps être fausse, inexacte ou trompeuse,
      immorale ou illégale. L’Utilisateur est également responsable de mettre à jour l'Information Personnelle
      que détient Artizyou &copy; sur ce dernier et qui a été divulguée lors de l’enregistrement en tant que membre.
    </p>
    <p>
      Artizyou &copy; se réserve le droit de retirer un contenu lorsqu’il y a des raisons de penser qu’un Utilisateur
      enfreint les présentes modalités d'utilisation. Artizyou &copy; se réserve également le droit de retirer le
      certificat d’attestation d’une Création s’il a des raisons de croire que ledit certificat a été obtenu
      sur la foi de fausses déclarations.
    </p>

    <h5>5 - Informations Personnelles</h5>
    <p>
        En utilisant les services de Artizyou &copy;, l’Utilisateur permet la collecte, l’utilisation et le traitement de ses
        Informations Personnelles et ce dans le cadre des études et statistiques nécessaires pour que les services
        d’Artizyou puissent améliorer les services qu’ils offrent et à élaborer leurs stratégies financières et de
        marketing. Ce consentement est présumé être accueilli à compter du moment où l’Utilisateur accepte les présentes
        conditions d’utilisation.
    </p>
    <p>
        Artizyou &copy; peut également collecter, utiliser, conserver ou traiter  les Informations Personnelles d’un
        Utilisateur sans son consentement ou à son insu, lorsque cela est requis par une loi applicable.
    </p>
    <p>
        Les Informations Personnelles de l’Utilisateur ne peuvent être divulguées par Artizyou&copy; sauf dans les cas exigés
        par la loi et les réglementations en vigueur.
    </p>

    <h5>6 - Exclusion de responsabilité</h5>
    <p>
      Artizyou &copy; décline toute responsabilité en ce qui concerne le matériel sur le Site Web, incluant notamment :
    </p>
    <ul>
      <li>Les renseignements de nature générale, qui ne sont pas destinés à tenir compte des circonstances spécifiques
        d’un Utilisateur;
      </li>
      <li>Les informations incomplètes, non-exhaustives, inexactes ou qui n’ont pas été mises à jour;</li>
      <li>Toutes informations provenant de sites extérieurs sur lesquels Artizyou &copy; n’a aucun contrôle, notamment tout
        lien publié sur le Site Web,
        la présence d’un tel lien ne pouvant être interprété comme une approbation de son contenu par Artizyou &copy;.
      </li>
    </ul>
    <p>
        Sans limiter la portée de ce qui précède, Artizyou &copy; ou ses affiliés, se dégage également de toute responsabilité
        relativement à ce qui suit :
    </p>
    <ul>
      <li>Toute déclaration trompeuse (involontaire ou frauduleuse) d’un Utilisateur relativement au Site Web et/ou à
        son contenu ;
      </li>
      <li>Toute information professionnelle ou utilisée à titre de conseils par l’Utilisateur. À ce titre, l’Utilisateur
        à la recherche de conseils spécifiques se doit de consulter un professionnel dûment qualifié.
      </li>
      <li>Les erreurs ou les temps d’arrêt du Site Web (ou des serveurs) ou qui résultent d’une interruption, d’un arrêt
        ou
        d’une anomalie de fonctionnement des services Internet ou des services de télécommunications d’un tiers.
      </li>
      <li>Tout contenu affiché par un Utilisateur ou des tiers, y compris, mais sans s’y limiter, des erreurs ou des
          omissions dans un tel contenu, ou pour toute perte ou dommage de quelque nature que ce soit, engendrée à la
          suite de l’utilisation d’un tel contenu affiché, listé, envoyé par courriel, transmis ou mis à la disposition
          de l’Utilisateur via le Site Web.
      </li>
    </ul>

    <h5>7 - Absence de garantie</h5>
    <p>
      À l’exception des informations, produits, services ou outils clairement identifiés comme étant fournis
      par Artizyou &copy;, Artizyou &copy; n’opère pas, ne contrôle pas, ou n’approuve pas les informations, produits ou
      services que l’on peut retrouver sur son Site Web. Artizyou &copy; ne peut pas et ne garantit pas que
      les fichiers disponibles pour téléchargement via son Site Web seront exempts d’infection, de
      virus, ou de défauts ayant des propriétés destructrices.
    </p>
    <p>
      Bien que Artizyou &copy; s’emploie à assurer l’exactitude et la fiabilité du contenu de son Site Web,
      ce dernier est offert « tel que disponible », sans aucune garantie ni condition de quelque
      nature que ce soit, expresse ou implicite. Artizyou &copy; exclut expressément toute déclaration
      ou garantie selon lesquelles le Site Web est exempt d’erreurs, de virus ou d’autres éléments nuisibles.
    </p>
    <p>
      Finalement, Artizyou &copy; ne garantit en aucune façon que les Créations sont la propriété de
      l’Utilisateur enregistré et toute reconnaissance de propriété intellectuelle est fondée sur les
      déclarations faites par l’Utilisateur lors de l’enregistrement.
    </p>
    <p>
      A titre d’intermédiaire, Artizyou &copy; n’est pas responsable du non-respect par l’un ou l’autre des
      Utilisateurs d’une entente de transfert effectuée avec un autre Utilisateur.
    </p>
    <p>
        L’Utilisateur reconnaît que le service d’alerte aux plagiats offert par Artizyou &copy; se se limite aux résultats
        obtenus à partir de la technologie utilisée par Artizyou &copy;, laquelle n’est pas responsable de toute divulgation
        d’un plagiat qui n’a pu être repérée par son mécanisme d’alerte.
    </p>
    <p>
        Artizou n'est pas responsable de la perte, la corruption, la destruction ou le vol de vos fichiers, Créations et
        votre mot de passe, et l’Utilisateur est seul responsable de la protection de ces fichiers.
    </p>

    <h5>8 - Indemnisation</h5>
    <p>
      L’Utilisateur reconnait et convient expressément que l’utilisation du Site web est à ses risques et périls.
      L’Utilisateur
      s’engage à défendre, à indemniser et à dégager de toute responsabilité Artizyou &copy; ainsi que ses administrateurs,
      dirigeants,
      fiduciaires et employés relativement aux obligations, frais et dépenses, y compris les honoraires d’avocat
      raisonnables, se rapportant à un manquement aux présentes conditions d’utilisation par l’Utilisateur ou
      tout autre Personne faisant usage de son compte.
    </p>

    <h5>9 - Enregistrement et transfert des Créations</h5>
    <p>
      L’Utilisateur reconnait que l’enregistrement de ses Créations est permanent et, qu’une fois une Création
      enregistrée
      ou transférée, l’enregistrement ou la transaction est finale et ne peut être modifiée autrement que par un nouvel
      enregistrement ou un nouveau transfert.
    </p>
    <p>
        Artizyou &copy; se réserve le droit de collecter un frais de gestion, frais d’administration ou autre frais pour
        chaque enregistrement, transfert ou transaction effectuée via son Site Web. Toutefois, Artizyou &copy; ne pourra être
        tenue responsable de quelque taxe que ce soit qui serait ou pourrait être due aux autorités gouvernementales
        respectives des Utilisateurs.
    </p>

    <h5>10 - Utilisation interdite</h5>
    <p>
      L’Utilisateur reconnaît qu’en utilisant le Site Web, ce dernier ne peut pas :
    </p>
    <ul>
      <li>Transmettre tout message anonyme ou sous un faux nom;</li>
      <li>Transmettre toute information illégale ou autrement répréhensible de quelque nature que ce soit;</li>
      <li>Transmettre tout message qui divulgue des affaires privées ou personnelles concernant une Personne ;</li>
      <li>Transmettre toute information, fichier ou logiciel qui contient un virus ou tout autre élément contaminant ou
        destructeur.
      </li>
      <li>Demander l’enregistrement d’une Création que l’utilisateur sait ne pas lui appartenir, ou demander un tel
          enregistrement sur la base d’informations fausses ou trompeuses.
      </li>
      <li>Sonder, analyser ou tester la vulnérabilité du système ou du réseau du Site Web.</li>
      <li>Enfreindre ou autrement contourner les mesures de sécurité ou d'authentification.</li>
      <li>Accéder aux zones non publiques des Services, aux zones partagées des Services auxquels vous n'avez
        pas été invité, ou aux systèmes informatiques de Artizyou &copy;;
      </li>
      <li>Interférer avec ou perturber tout utilisateur, hôte ou réseau;</li>
      <li>Télécharger ou distribuer des logiciels malveillants;</li>
      <li>Accéder aux Services par d'autres moyens que nos interfaces prises en charge publiquement (par exemple en
          "raclant" ou en "indexant" le contenu des Services);
      </li>
      <li>Envoyer des communications non sollicitées ou du spam;</li>
      <li>Envoyer des informations d'identification de source altérées, trompeuses ou fausses, y compris l'usurpation
        d'identité ou l’hameçonnage;
      </li>
      <li>Publier quelque chose de frauduleux, trompeur ou qui viole les droits d'un tiers;</li>
      <li>Promouvoir ou faire de la publicité pour des produits ou services autres que le vôtre sans autorisation
        appropriée;
      </li>
      <li>Déformer votre affiliation avec une personne ou une entité;</li>
      <li>Publier des documents illicites ou illégalement pornographiques ou indécents, ou qui encouragent la violence
        ou
        la haine contre des groupes basés sur la race, la religion, l'appartenance ethnique, le sexe, l'orientation
        sexuelle,
        l'identité de genre, le handicap ou d'autres motifs;
      </li>
      <li>Violer la vie privée ou diffamer les autres.</li>
    </ul>
    <p>
        Tout Utilisateur qui contrevient de façon répétée aux présentes Conditions d’utilisation pourrait se voir banni
        du Site Web par Artizyou &copy;, le tout à son entière discrétion.
    </p>

    <h5>11 - Avis d’infraction allégué</h5>
    <p>
      Tout Utilisateur qui suspecte l’utilisation du Site Web par un autre Utilisateur d’une manière non-conforme aux
      présentes Conditions d’utilisation peut transmettre à Artizyou &copy; un avis d’infraction conforme aux instructions
      suivantes :
    </p>
    <ul>
      <li>Identifier la Création et les droits que vous prétendez détenir sur celle-ci, ou, si plusieurs Créations sont
        couvertes par le présent avis, fournissez une liste représentative des Créations et des droits qui, selon vous,
        ont été enfreints.
      </li>
      <li>Identifier le lien URL se rapportant à la Création plagiée ou l'emplacement exact où cette Création peut être
        trouvée.
      </li>
      <li>Indiquer votre nom, ou celui de votre entreprise, votre adresse postale, votre numéro de téléphone et votre
        adresse électronique.
      </li>
      <li>
        Inclure les deux énoncés suivants dans le corps de l'avis:
      </li>
    </ul>
    <p>
      <i>
        « Je déclare par la présente que je crois de bonne foi que l'utilisation contestée de la Création n'est pas
        autorisée par le détenteur de droits, son agent ou la loi, y compris en cas d'usage loyal,
        d'utilisation équitable ou d'autres exemptions légales ou de droit commun. »
      </i>
    </p>
    <p>
      <i>
        « Je déclare par la présente que les informations contenues dans le présent avis sont
        exactes et, sous peine de parjure, que je suis le titulaire des droits, ou autorisé à agir au nom du titulaire
        des droits, du droit d'auteur ou d'un droit exclusif prétendument violé. »
      </i>
    </p>
    <ul>
      <li>Fournir votre nom légal complet et votre signature électronique ou physique.</li>
    </ul>
    <p>
      Transmettre cet avis, avec tous les éléments remplis, à Artizyou &copy; au <NormalLinkWrapper
      href="mailto:contact@artizyou.com">contact@artizyou.com</NormalLinkWrapper>
      &nbsp; et nous vous transmettrons un guide pratique pour tenter de remédier à la situation litigieuse. À noter que
      Artizyou &copy;
      ne s’engage pas à régler l’infraction alléguée si un tel règlement n’est pas dans son pouvoir.
    </p>

    <h5>12 - Modification aux termes et conditions</h5>
    <p>
      Artizyou &copy; peut modifier les présentes conditions d’utilisation à tout moment sans préavis, en diffusant
      les termes modifiés sur le Site Web. L’Utilisateur qui continue d’utiliser le Site Web postérieurement à
      la modification des conditions d’utilisation est présumé avoir accepté ses conditions d’utilisation modifiées.
    </p>

    <h5>13 - Général</h5>
    <p>
      Artizyou &copy; peut modifier, suspendre ou interrompre tout aspect du service à tout moment, y compris
      la disponibilité de toute fonctionnalité du service ou son contenu ou imposer des limites à certaines
      fonctionnalités ou certains aspects du service ou limiter l’accès d’un Utilisateur à tout ou certaines
      parties du service, pour quelque raison jugée raisonnable par Artizyou &copy;, sans préavis ni
      responsabilité ou obligation de remboursement des frais payés.
    </p>
    <p>
      Artizyou &copy; se réserve en tout temps le droit de divulguer toute information nécessaire afin de se conformer à
      toute loi ou à tout règlement applicable, à toute procédure judiciaire ou à toute demande d’un gouvernement, et de
      modifier, de refuser d’afficher ou de supprimer, en tout ou en partie, toute information ou tout
      élément à leur entière discrétion.
    </p>
    <p>
      Les présentes conditions d'utilisation à l’égard des services sur le Site Web constituent l'intégralité de
      l'accord conclu entre l’Utilisateur et Artizyou &copy;. Les présentes conditions d’utilisation sont régies par les
      lois de la province de Québec et par les lois fédérales du Canada qui y sont applicables. A ce titre,
      toute poursuite ou litige judiciaire ou autre en lien avec les présentes Conditions d’utilisation sera de
      la compétence exclusive des tribunaux du district judiciaire de Montréal, à l’exclusion de tout autre
      district compétent. Artizyou &copy; adressera toute notification à l’Utilisateur par le biais de l'adresse
      courriel que ce dernier aura fourni.
    </p>
    <WarningNotice>
        IMPORTANT: Toute tentative de contrefaçon ou de plagiat de la plateforme Artizyou &copy; engage la responsabilité
        pénale et civile de son auteur et donne droit à Artizyou de réclamer des dommages-intérêts dont le montant ne
        peut être inférieur à 1.5 Millions USD. .
    </WarningNotice>

    <h5>14 - Questions et commentaires</h5>
    <p>
        Pour toute question en lien avec la présente Politique de confidentialité, veuillez communiquer directement par
        courriel à <NormalLinkWrapper href="mailto:info@Artizyou.com">info@Artizyou.com</NormalLinkWrapper>.
    </p>

    <p>
      <i>
          Dernière modification : Juin 2021
      </i>
    </p>
  </div>
);


const ConditionsEN = (
    <div>
        <h2>
            PRIVACY POLICY
        </h2>
        <p className="text-center">
            <strong>
                <em>*Please read the following terms attentively</em>
            </strong>
        </p>

        <h5>1 - Definitions</h5>
        <p>
            <strong>"Artizyou &copy;"</strong> means Artizjob Inc., whose offices are located at 1 Westmount Car, Office 330, Westmount, Quebec, Canada H3Z 2P9,
            and its subsidiaries, affiliates and successor companies.
        </p>
        <p>
            <strong>"Creations"</strong> means the creations and any intellectual property belonging to the User and submitted
            to Artizyou &copy; as part of the Use of the Website, including any physical or digital object,
            or other digital properties or services that may be digitally
            represented (for example, photos, images, 3D-STL files, texts, music, videos, etc.).
        </p>
        <p>
            <strong>"Personal Information"</strong> means the personally identifiable information and all or groups of data
            associated with the User's personally identifiable information in a manner that allows the User to identify it
            quickly and easily, excluding any Personal Information that the User decides to display in the public sections
            of the Website.
        </p>
        <p>
            <strong>"Person"</strong> means, as the case may be, an individual, a partnership, a corporation, a company, a cooperative,
            an association or any other organization with or without a separate legal personality.
        </p>
        <p>
            <strong>"Website"</strong> means Artizyou &copy;'s website accessible at <NormalLinkWrapper
            href="https://www.artizyou.com">www.artizyou.com</NormalLinkWrapper>, as well as related features, applications,
            services or websites.
        </p>
        <p>
            <strong>"User"</strong> means the Person
            using the services offered by Artizyou &copy; through its Website.
        </p>
        <h5>2 - Generalities</h5>
        <p>
            Artizyou &copy; is an online platform for recording your intellectual property rights, including copyright, all via
            blockchain technology. In addition, Artizyou &copy; allows Users to communicate with each other in order to obtain an
            assignment or a license to use the Creations of other Users. Artizyou &copy; maintains its Website to improve access
            for all Users to information about products, services, projects, tools and other information in the
            copyright field worldwide.
        </p>
        <p>
            In general, Artizyou &copy; does not allow you to directly transfer sums of money via its Website and allows the use
            of the blockchain only for the purpose of recording a proof of priority of your rights.
        </p>

        <h5>3 - Condition Of Use</h5>
        <p>
            Artizyou &copy; offers the User access to and use of the Website provided that the latter
            accepts without modification the terms, conditions and exclusions set out herein.
        </p>
        <p>
            By using the Website and its content, the User expressly accepts these terms of use.
            The collection, use and disclosure of Personal Information by Artizyou &copy; through
            its Website is subject to Artizyou &copy;'s Privacy Policy.
        </p>
        <p>
            By accepting these terms and conditions, the User consents to the collection, use and processing of Personal
            Information in accordance with our Privacy Policy and and within the framework of compliance with the regulations
            in force in North America.
        </p>
        <p>
            All Users must be 18 years of age or over, or have the approval of their legal guardian, in order to use the
            Website and Artizyou's services.
        </p>

        <h5>4 - Content Submission And Creation</h5>
        <p>
            The User acknowledges that all information (including and without limitation the information or content provided
            during the registration of a Creation), data, text, files, images, graphics, videos, messages, logos or other
            files that they are posted on this Website (including forums or other public areas) or transmitted privately
            through this Website, do not belong to Artizyou &copy; and are the responsibility of the User from which they come,
            whether this information is transmitted for Artizyou &copy;, other Users, suppliers or service providers.
        </p>
        <p>
            The User, and not Artizyou &copy; or its affiliates, acknowledges that it is solely responsible for any content and
            Creation that the latter downloads, publishes, lists, saves, sends by email, transmits or makes available via
            this Website, which acts as a passive conduit for the registration and transfer of Creations.
        </p>
        <p>
            The User is responsible for the content of the information disclosed in connection with the use of this Website,
            which information must not at any time be false, inaccurate or misleading, immoral or illegal. The User is also
            responsible for updating the Personal Information held by Artizyou &copy; on the latter and which was disclosed when
            registering as a member.
        </p>
        <p>
            Artizyou &copy; reserves the right to remove content when there is reason to believe that a User is in breach of
            these Terms of Use. Artizyou &copy; also reserves the right to withdraw the Certificate of Attestation of a
            Creation if it has reason to believe that the said certificate was obtained on the basis of false declarations.
        </p>


        <h5>5 - Personal Information</h5>
        <p>
            By using the services of Artizyou &copy;, the User allows the collection, use and processing and disclosure
            of their usage information on the Artizyou &copy; website and application as part of the studies and statistics
            necessary for the services of Artizyou &copy; to improve the services that 'they offer and develop their financial
            and marketing strategies for other purposes. This consent is presumed to be accepted from the moment the User accepts
            these conditions of use. Artizyou &copy; will never sell, rent, transfer, expose personel data to any third party.
        </p>
        <p>
            Artizyou &copy; may also collect, use, store or process the Personal Information of a User without their consent
            or without their knowledge, when this is permitted and required by applicable law. The User's Personal Information
            may not be disclosed by Artizyou &copy; except in the cases required by law and the regulations in force.
        </p>

        <h5>6 - Exclusion of liability</h5>
        <p>
            Artizyou &copy; disclaims all liability with respect to the material on the Website, including but not limited to:
        </p>
        <ul>
            <li>Information of a general nature, which is not intended to take into account the specific circumstances of a User;
            </li>
            <li>Incomplete, non-exhaustive, inaccurate or un-updated information;</li>
            <li>Any information from external sites over which Artizyou &copy; has no control, including any link published on
                the Website, the presence of such a link can not be interpreted as an approval of its content by Artizyou &copy;.
            </li>
        </ul>
        <p>
            Without limiting the foregoing, Artizyou &copy; or its affiliates also disclaims any and all liability with respect to the following:
        </p>
        <ul>
            <li>Any misleading (involuntary or fraudulent) statement by a User regarding the Website and / or its content;
            </li>
            <li>Any professional information or used as advice by the User. As such, the User seeking specific advice must
                consult a suitably qualified professional.
            </li>
            <li>Errors or downtime of the Website (or servers) or resulting from an interruption, shutdown or malfunction of
                the Internet services or telecommunications services of a third party.
            </li>
            <li>Any content posted by a User or third parties, including, but not limited to, errors or omissions in such
                content, or for any loss or damage of any kind, arising as a result of use of such content posted, listed,
                emailed, transmitted or made available to the User via the Website.
            </li>
        </ul>

        <h5>7 - No warranty</h5>
        <p>
            With the exception of information, products, services or tools clearly identified as being provided by Artizyou &copy;,
            Artizyou &copy; does not operate, control or approve any information, products or services that may be found on its Site.
            Web. Artizyou &copy; can not and does not guarantee that the files available for download via its Website will be free
            of infection, viruses, or defects with destructive properties.
        </p>
        <p>
            While Artizyou &copy; endeavors to ensure the accuracy and reliability of the content of its Website, it is
            offered "as available" without any warranties or conditions of any kind, express or implied. Artizyou &copy;
            expressly excludes any representation or warranty that the Website is free from errors, viruses or other harmful
            elements.
        </p>
        <p>
            Finally, Artizyou &copy; does not guarantee in any way that the Creations are the property of the Registered User
            and any recognition of intellectual property is based on the statements made by the User upon registration.
        </p>
        <p>
            As an intermediary, Artizyou &copy; is not liable for the non-compliance by one or the other Users of a transfer
            agreement made with another User.
        </p>
        <p>
            The User acknowledges that the plagiarism warning service offered by Artizyou &copy; is limited to results
            obtained from the technology used by Artizyou &copy;, which is not responsible for any disclosure of plagiarism
            that could not be detected by its warning mechanism.
        </p>
        <p>
            Artizyou &copy; is not responsible for the loss, corruption, destruction or theft of your files, Creations and
            your password, and the User is solely responsible for the protection of these files.
        </p>
        <h5>8 - Indemnity</h5>
        <p>
            The User acknowledges and expressly agrees that the use of the Website is at his own risk. The User agrees to
            defend, indemnify and hold harmless Artizyou &copy; and its directors, officers, trustees and employees with
            respect to obligations, costs and expenses, including reasonable attorney's fees, relating to a breach of these
            terms of use by the User or any other Person making use of his account.
        </p>

        <h5>9 - Registration and transfer of creations</h5>
        <p>
            The User acknowledges that the registration of his Creations is permanent and, once a Creation has been
            registered or transferred, the registration or the transaction is final and can not be modified other than by a
            new registration or a new transfer.
        </p>
        <p>
            Artizyou &copy; reserves the right to collect a management fee, administration fee or other fee for each
            registration, transfer or transaction made through its Website. However, Artizyou &copy; cannot be held
            responsible for any tax that is or could be due to the respective governmental authorities of Users.
        </p>


        <h5>10 - Prohibited use</h5>
        <p>
            The User acknowledges that by using the Website, the Website can not:
        </p>
        <ul>
            <li>Transmit any anonymous message or under a false name;</li>
            <li>Transmitting any illegal or otherwise objectionable information of any kind;</li>
            <li>Transmitting any message that discloses private or personal matters about a Person;</li>
            <li>Transmit any information, files or software that contains a virus or other contaminating or destructive
                element.
            </li>
            <li>Request the registration of a Creation that the user knows does not belong to him, or request such
                registration on the
                basis of false or misleading information.
            </li>
            <li>Probe, analyze or test the vulnerability of the system or the network of the Website.</li>
            <li>Violate or otherwise circumvent security or authentication measures.</li>
            <li>Access non-public areas of the Services, shared areas of the Services to which you have not been invited,
                or Artizyou &copy;'s computer systems;
            </li>
            <li>interfere with or disrupt any user, host or network;</li>
            <li>Download or distribute malware;</li>
            <li>Access the Services by any means other than our publicly supported interfaces (for example by "scraping" or
                "indexing" the content of the Services);
            </li>
            <li>Send unsolicited communications or spam;</li>
            <li>Send altered, misleading or false source identification information, including impersonation or phishing;</li>
            <li>Post something that is fraudulent, misleading or violates the rights of a third party;</li>
            <li>Promote or advertise products or services other than your own without proper authorization;</li>
            <li>Distort your affiliation with a person or entity;</li>
            <li>Publish illegal or illegally pornographic or indecent documents, or that encourage violence or hatred against
                groups based on race, religion, ethnicity, gender, sexual orientation, gender identity, disability or other reasons;
            </li>
            <li>Violate privacy or defame others.</li>
        </ul>
        <p>
            Any User who repeatedly contravenes these Terms of Use may be banned from the Website by Artizyou &copy; at its sole
            discretion.
        </p>

        <h5>11 -  Notice Of Alleged Offense</h5>
        <p>
            Any User who suspects the use of the Website by another User in a manner that does not comply with these Terms
            of Use may submit to Artizyou &copy; a notice of violation in accordance with the following instructions:
        </p>
        <ul>
            <li>Identify the Creation and the rights you claim to hold on it, or, if multiple Creatives are covered by this
                notice, provide a representative list of Creations and Rights that you believe have been infringed.
            </li>
            <li>
                Identify the URL link to the Plagiarized Creation or the exact location where this Creation can be found.
            </li>
            <li>
                Indicate your name, your company name, your mailing address, your telephone number and your email address.
            </li>
            <li>
                Include the following two statements in the body of the notice:
            </li>
        </ul>
        <p>
            <i>
                "I hereby declare that I believe in good faith that the disputed use of the Creation is not authorized by the
                rights holder, its agent or the law, including in the case of fair use, fair dealing or other legal or common
                law exemptions. "
            </i>
        </p>
        <p>
            <i>
                "I hereby declare that the information contained in this notice is accurate and, under penalty of perjury,
                that I am the owner of the rights, or authorized to act on behalf of the owner of the rights,
                copyright or an exclusive right allegedly violated. "
            </i>
        </p>
        <ul>
            <li>Provide your full legal name and your electronic or physical signature.</li>
        </ul>
        <p>
            Forward this notice, with all the elements filled, to Artizyou &copy; at <NormalLinkWrapper
            href="mailto:infos@artizyou.com">infos@artizyou.com</NormalLinkWrapper> and we will send
            you a practical guide to try to remedy the situation in question.Please note that Artizyou &copy; does not undertake to
            settle the alleged offense if such a regulation is not within its power.
        </p>
        <h5>12 - Amendment to terms and conditions</h5>
        <p>
            Artizyou &copy; may modify, suspend or discontinue any aspect of the Service at any time, including the availability
            of any feature of the Service or its content or impose limits on certain features or aspects of the Service or
            limit a User's access to any or parts of the service, for any reason deemed reasonable by Artizyou &copy;, without
            notice or liability or obligation to refund any fees paid.
        </p>

        <h5>13 - General</h5>
        <p>
            Artizyou &copy; reserves the right at any time to disclose any information necessary to comply with any applicable law
            or regulation, any legal proceeding or any request from a government, and to modify, refuse to post or delete,
            in whole or in part, any information or material in their sole discretion.
        </p>
        <p>
            These terms of use with respect to the services on the Website constitute the entire agreement between the User
            and Artizyou &copy;. These terms of use are governed by the laws of the Province of Quebec and the federal laws of
            Canada applicable therein. As such, any prosecution or legal or other litigation in connection with these Terms
            of Use will be the exclusive jurisdiction of the courts of the judicial district of Montreal, to the exclusion
            of any other competent district. Artizyou &copy; will send any notification to the User via the email address provided
            by the User.
        </p>
        <p>
            IMPORTANT: Any attempt at counterfeiting or plagiarism of the Artizyou &copy;platform engages the criminal and
            civil liability of its author and entitles Artizyou &copy; to claim damages, the amount cannot be less than 1.5 Million USD.
        </p>
        <WarningNotice>
            IMPORTANT: Any attempt at counterfeiting or plagiarism of the Artizyou&copy; platform engages the criminal and
            civil liability of its author and entitles Artizyou&copy; to claim damages, the amount cannot be less than
            1.5 Million USD.
        </WarningNotice>
        <h5>14 - Questions and comments</h5>
        <p>
            If you have any questions regarding this Privacy Policy, please contact us directly by
            email at <NormalLinkWrapper href="mailto:infos@artizyou.com">infos@artizyou.com</NormalLinkWrapper>.
        </p>

        <p>
            <i>
                Last modification: June 2021
            </i>
        </p>
    </div>
);

const ConditionsOfUse = ({user}) => {
  const content = user.language === 'fr' ? ConditionsFR : ConditionsEN;

  return (
    <div className="container">
      {content}
    </div>);
};

export default WithUser(ConditionsOfUse);