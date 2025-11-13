import React from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import WithUser from '../../containers/withUser';

const LinkWrapper = styled(Link)`
  color: ${props => props.theme.artz.primaryColor};
  text-decoration: underline;
  transition: all .25s ease;
  
  &:hover{
    color: #9c3905;
  }
`;

const NormalLinkWrapper = styled.a`
  color: ${props => props.theme.artz.primaryColor};
  text-decoration: underline;
  transition: all .25s ease;
  
  &:hover{
    color: #9c3905;
  }
`;

const PrivacyPolicyFR = (
  <div>
    <h2>
      POLITIQUE DE CONFIDENTIALITÉ
    </h2>
    <p className="text-center">
      <strong>
        <em>*Veuillez lire attentivement les modalités ci-dessous.</em>
      </strong>
    </p>

    <h5>1 - DÉFINITIONS</h5>
    <p>
      <strong>« Artizyou &copy; »</strong> désigne la société Artizjob Inc., dont les bureaux sont situés au 118 rue
      Nicholson, à Salaberry-de-Valleyfield, province de Québec, J6T 4N4, ainsi qu’à ses filiales, sociétés affiliées
      et sociétés remplaçantes
    </p>
    <p>
      <strong>« Condition d’utilisation »</strong> désigne les termes et conditions de Artizyou &copy;, disponibles
      au lien suivant : <LinkWrapper to="/conditions_of_use">Conditions d’utilisation</LinkWrapper>
    </p>
    <p>
      <strong>« Créations »</strong> désigne les créations et toute propriété intellectuelle appartenant à
      l’Utilisateur et soumis à Artizyou &copy; dans le cadre de l’Utilisation du Site Web, notamment tout objet
      physique ou numérique, ou d'autres propriétés ou services numériques ou pouvant être représentés numériquement
      (par exemple, des photos, images, fichiers 3D-STL, textes, musique, vidéos, etc.)
    </p>
    <p>
      <strong>« Information Personnelle »</strong> désigne les informations d’identification personnelle et l’ensemble
      ou groupes de données associés aux renseignements d’identification personnelle de l’Utilisateur de manière
      à permettre de l’identifier rapidement et facilement, dont notamment, son nom, adresse, adresse courriel
      ou numéros de téléphones, à l’exclusion des informations personnelles qui sont accessibles au public.
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

    <h5>2 - GÉNÉRALITÉS</h5>
    <p>
      La présente politique de confidentialité (ci-après la «<strong> Politique de Confidentialité </strong>») décrit la façon dont
      l’utilisation, la protection et la divulgation des Informations Personnelles de l’Utilisateur sont traitées
      dans le cadre de l’utilisation du Site Web de Artizyou &copy; par l’Utilisateur.
    </p>
    <p>
      Artizyou &copy; s’engage à recueillir, héberger, traiter, utiliser, protéger et transmettre les Informations Personnelles
      de l’Utilisateur conformément aux modalités de la présente. En utilisant le Site Web de Artizyou &copy; et
      son contenu, l’Utilisateur accepte expressément d’être lié par la présente Politique de Confidentialité.
    </p>

    <h5>3 - COLLECTE DES INFORMATIONS PERSONNELLES</h5>
    <p>
      La majorité des Informations Personnelles qui sont collectées par Artizyou &copy; dans le cadre de l’utilisation de
      son Site Web sont volontairement fournies par l’Utilisateur lors de l’utilisation du Site Web.
    </p>
    <p>
      Par ailleurs, l’Utilisateur consent à ce que Artizyou &copy; puisse collecter certaines Informations Personnelles
      automatiquement, notamment, mais sans limitation, le type d'appareil mobile que vous utilisez, l'adresse
      IP, le système d'exploitation de votre appareil, le navigateur Internet que vous utilisez, le nom de domaine,
      les temps d'accès, la durée des visites, l'URL de référence, la plate-forme web, l'horodatage et les informations
      de page de sortie, ainsi que certaines informations sur la façon dont vous utilisez le Site-Web.
    </p>
    <p>
      Artizyou &copy; ne conservera pas les Informations Personnelles de l’Utilisateur au-delà du délai permis par
      la loi et ces dernières seront supprimées lorsque celles-ci ne seront plus nécessaires aux fins
      décrites dans la présente Politique de Confidentialité.
    </p>

    <h5>4 - UTILISATION DES INFORMATIONS PERSONNELLES</h5>
    <p>
      Les Informations Personnelles qui sont demandées à l’Utilisateur dans le cadre de
      l’utilisation du Site Web de Artizyou &copy; sont collectées dans l’objectif de personnaliser
      l’expérience de ce dernier sur le Site Web et afin de faciliter la communication avec les entreprises figurantes sur
      le Site Web.
    </p>
    <p>
      Par ailleurs, l’Utilisateur consent à ce que ses Informations Personnelles puissent être utilisées afin que
      Artizyou &copy; puisse
      lui envoyer des communications essentielles concernant ses services et ses opérations via son adresse courriel,
      dont notamment, mais sans s’y limiter, des confirmations, ajouts ou suppression aux services de Artizyou &copy;,
      notifications
      d’améliorations de produits, son infolettre, des notifications d’interruption de service du Site Web ainsi que des
      avis de changements aux conditions d’utilisations ou à la présente Politique de Confidentialité.
    </p>
    <p>
      Toutefois, l’Utilisateur conserve la possibilité, que ce soit au moment de son inscription ou à tout moment
      par la suite, de refuser de recevoir toutes communications non essentielles de la part de Artizyou &copy;, dont
      notamment des annonces ainsi que des bulletins d’informations, en utilisant le lien prévu à cet effet
      pour se retirer de toutes communications futures.
    </p>

    <h5>5 - CRÉATIONS DE L’UTILISATEUR</h5>
    <p>
      Les Créations de l’Utilisateur lui appartiennent en totalité et aucun acte ou action de l’Utilisateur ne peut, de
      façon expresse ou tacite, constituer une cession de ses droits à quelque personne que ce soit, notamment Artizyou &copy;
      et les autres Utilisateurs du Site Web.
    </p>
    <p>
      Toute information en lien avec les Créations de l’Utilisateur seront encryptées par Artizyou &copy; avant leur
      transmission à la Blockchain.
    </p>
    <p>
      Au moment de l’enregistrement d’une Création par l’Utilisateur, une copie de ladite Création sera enregistrée
      sur les serveurs de Artizyou &copy;, ainsi qu’une copie des informations du créateurs, notamment son nom, le titre de son
      œuvre, l’année de sa création, etc.
    </p>
    <p>
      L’adresse courriel de l’Utilisateur ayant soumis une Création sera visible et public dans l’historique de
      propriété de la Création. De plus, lorsqu’une Création est transigée par l’Utilisateur via le Site Web, les
      informations sur cette Création et sur la transaction seront et demeureront publiques, sans possibilité de
      modification ou de suppression.
    </p>
    <p>
      Une fiche de travail sera créée par Artizyou &copy; lorsqu’une Création est soumise par l’Utilisateur, ladite fiche
      devant demeurée privée à l’Utilisateur et aux personnes qu’il autorise à en prendre connaissance.
    </p>


    <p>Il existe différents types de cookies avec différentes fonctions :</p>

    <div className="table-container">
      <div className="table-row-container">
        <div className="table-column-first">Cookies de session</div>
        <div className="table-column-second">
          Ils ne sont stockés sur votre ordinateur que pendant votre session Web. Ils sont automatiquement supprimés
          à la fermeture du navigateur. Ils stockent généralement un identifiant de session anonyme vous permettant de
          naviguer sur un site Web sans avoir à vous connecter à chaque page. Ils ne collectent aucune information de votre ordinateur.
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">Cookies persistants</div>
        <div className="table-column-second">
          Un cookie persistant est un cookie stocké sous forme de fichier sur votre ordinateur et il y reste lorsque
          vous fermez votre navigateur Web. Le cookie peut être lu par le site Web qui l'a créé lorsque vous visitez à nouveau ce site Web.
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">Cookies de première partie</div>
        <div className="table-column-second">
          La fonction de ce type de cookie est de conserver vos préférences pour un site Web particulier pour l'entité
          qui possède ce site Web. Ils sont stockés et envoyés entre les serveurs d'ARTIZYOU et le disque dur de votre
          ordinateur. Ils ne sont pas utilisés à d'autres fins que la personnalisation définie par vous. Ces cookies
          peuvent être des cookies de session ou persistants.
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">Cookies tiers</div>
        <div className="table-column-second">
          La fonction de ce type de cookie est de conserver votre interaction avec un site Web particulier pour une
          entité qui n'est pas propriétaire de ce site Web. Ils sont stockés et envoyés entre le serveur du tiers et le
          disque dur de votre ordinateur. Ces cookies sont généralement des cookies persistants.
        </div>
      </div>
    </div>

    <br/>

    <p>Nous utilisons généralement des cookies comme suit :</p>

    <div className="table-container">
      <div className="table-row-container">
        <div className="table-column-first">Fonctionnalité</div>
        <div className="table-column-second">
          Certains cookies permettent à nos Sites de mémoriser les choix que vous faites (tels que votre nom
          d'utilisateur, votre langue ou la région dans laquelle vous vous trouvez) et offrent des fonctionnalités
          améliorées. Par exemple, un site peut mémoriser vos informations de connexion, de sorte que vous n'ayez pas
          à vous connecter à plusieurs reprises à votre compte lorsque vous utilisez un appareil particulier pour
          accéder à nos sites. Ces cookies peuvent également être utilisés pour mémoriser les modifications que vous
          avez apportées à la taille du texte, à la police et à d'autres parties des pages Web que vous pouvez
          personnaliser. Ils peuvent également être utilisés pour fournir des services que vous avez demandés, tels
          que la visualisation d'une vidéo ou le commentaire d'un article. Les informations que ces cookies collectent
          sont généralement anonymisées. Ils ne collectent aucune information vous concernant qui pourrait être
          utilisée à des fins publicitaires ou se rappeler où vous avez été sur Internet
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">Performance</div>
        <div className="table-column-second">
          Certains cookies collectent des informations sur la façon dont les visiteurs utilisent un Site, par exemple
          les pages que les visiteurs consultent le plus souvent, et s'ils obtiennent des erreurs messages provenant de
          pages Web. Ils nous permettent également d'enregistrer et de compter le nombre de visiteurs sur un Site, ce
          qui nous permet de voir comment les visiteurs utilisent un Site afin d'améliorer le fonctionnement
          du Site. Les informations que ces cookies collectent sont normalement anonymes et sont utilisées pour
          améliorer le fonctionnement de nos sites. Cependant, certains de ces cookies peuvent inclure des
          informations personnelles. Veuillez consulter la documentation « Aide » de votre navigateur Web ou visitez
          wikipedia pour plus d'informations sur la façon d'activer et de désactiver les cookies pour votre navigateur
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">Marketing</div>
        <div className="table-column-second">
          Ces cookies sont utilisés pour fournir du contenu correspondant à vos intérêts sur un Site et des sites
          tiers en fonction de la façon dont vous interagissez avec nos publicités ou notre contenu
        </div>
      </div>
    </div>

    <br/>

    <h5>6 - COMMUNICATION ET DIVULGATION DES INFORMATIONS PERSONNELLES</h5>
    <p>
      Dans le cadre de l’utilisation du Site Web, Artizyou &copy; se réserve le droit de divulguer les Informations
      Personnelles de l’Utilisateur de la manière suivante :
    </p>
    <ul>
      <li>
        Lorsque Artizyou &copy; estime qu'il convient d'enquêter, de prévenir ou de prendre des mesures contre des actes
        illégaux ou suspectés, pour protéger et défendre les droits, la propriété ou la sécurité de Artizyou &copy;, ses
        Utilisateurs ou d'autres personnes; et dans le cadre de l'application des Conditions d’utilisation de Artizyou &copy;.
      </li>
      <li>
        Avec des sociétés offrant des services à Artizyou &copy; au terme d’un contrat, tels les fournisseurs de messagerie
        électronique, les fournisseurs d'hébergement et les fournisseurs prestataires de services de paiement
        conformément à la présente Politique de Confidentialité. Lorsque les Informations Personnelles de l’Utilisateur
        sont partagées avec un fournisseur, celui-ci sera contractuellement obligé d'utiliser ses Informations
        Personnelles en lien avec ses obligations contractuelles. Les fournisseurs n'ont pas le droit de partager les
        Informations Personnelles de l’Utilisateur avec d'autres organisations ou de le contacter, sauf si
        expressément prévu dans leur contrat avec Artizyou &copy;.
      </li>
      <li>
        Tel que requis par la loi et lorsque Artizyou &copy; estime que la divulgation est nécessaire pour protéger ses droits
        et/ou pour se conformer à une procédure judiciaire, une ordonnance du tribunal ou une procédure judiciaire. Cela
        inclu notamment, mais sans limitation, la fraude, les problèmes techniques ou la déficience du réseau ou des
        systèmes de Artizyou &copy;.
      </li>
    </ul>

    <h5>7 - PROTECTION DES INFORMATIONS PERSONNELLES</h5>
    <p>
      Artizyou &copy; fournit des garanties physiques, électroniques et procédurales pour protéger vos Informations
      Personnelles. Par ailleurs, Artizyou &copy; maintient les pratiques de gestion et d’hébergement des données standards de
      l'industrie qui sont conçues pour assurer l'intégrité et la confidentialité des Informations Personnelles de
      l’Utilisateur.
    </p>
    <p>
      En dépit de ces pratiques, l’Utilisateur reconnaît qu'aucune méthode de transmission électronique ou d’hébergement
      de données n'est complètement sécuritaire et qu'aucune mesure ne peut prévenir une violation de sécurité
      potentielle.
    </p>
    <p>
      Par conséquent, l’Utilisateur reconnaît que, dans la mesure où Artizyou &copy; respecte les standards énoncés ci-dessus,
      cette dernière n’est pas responsable des dommages subis en raison d’un accès non autorisé à ses Informations
      Personnelles ou d'une violation de données.
    </p>
    <p>
      Sur demande, Artizyou &copy; supprimera toute Information Personnelle qu’elle n’est pas tenue par la loi de conserver.
    </p>

    <h5>8 - MODIFICATION AUX TERMES ET CONDITIONS</h5>
    <p>
      Artizyou &copy; se réserve le droit de modifier la présente Politique de Confidentialité à tout moment sans préavis, en
      diffusant les termes modifiés sur le Site Web. L’Utilisateur qui continue d’utiliser le Site Web postérieurement à
      la modification de la présente Politique de Confidentialité est présumé l’avoir acceptée.
    </p>
    <p>
      La fusion, la vente ou la dissolution de Artizyou &copy; peut également entraîner le transfert de vos Informations
      Personnelles à une entité liée.
    </p>

    <h5>9 - QUESTIONS ET COMMENTAIRES</h5>
    <p>
      Pour toute question en lien avec la présente Politique de confidentialité, veuillez communiquer directement
      par courriel à <NormalLinkWrapper href="mailto:contact@artizyou.com">contact@artizyou.com</NormalLinkWrapper>.
    </p>

    <p>
      <i>
        Dernière modification : Juin 2021
      </i>
    </p>
  </div>
);

const PrivacyPolicyEN = (
  <div>
    <h2>
      PRIVACY POLICY
    </h2>
    <p className="text-center">
      <strong>
        <em>*Please read the following terms attentively</em>
      </strong>
    </p>

    <h5>1 - DEFINITIONS</h5>
    <p>
      <strong>"Artizyou &copy;"</strong> means Artizjob Inc., whose offices are located at 1 Westmount Car, Office
      330, Westmount, Quebec, Canada H3Z 2P9, and its subsidiaries, affiliates and successor companies.
    </p>
    <p>
      <strong>"Web Site Usage Agreement"</strong> means the terms and conditions of Artizyou &copy;, available at the
      following link: <LinkWrapper to="/conditions_of_use">Terms of use</LinkWrapper>
    </p>
    <p>
      <strong>"Creations"</strong> means the creations and any intellectual property belonging to the User and
      submitted to Artizyou &copy; as part of the Use of the Website, including any physical or digital object, or other
      digital properties or services that may be digitally represented (for example, photos, images, 3D-STL files,
      texts, music, videos, etc.).
    </p>
    <p>
      <strong>"Personal Information"</strong> means the personally identifiable information and all or groups of data
      associated with the User's personally identifiable information in a manner that allows the Identifier to be
      identified quickly and easily, including but not limited to, its name, address, email address or telephone number,
      excluding personal information that is publicly available.
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

    <h5>2 - GENERAL</h5>
    <p>
      This <strong>"Privacy Policy"</strong> describes how the use, protection and
      disclosure of the User's Personal Information is processed in connection with the use of the Artizyou &copy; Website by the User.
    </p>
    <p>
      Artizyou &copy;
      undertakes to collect, host, process, use, protect and transmit the User's Personal Information in accordance with
      the terms and conditions herein. By using the Artizyou &copy; Website and its content, the User expressly agrees to be
      bound by this Privacy Policy.
    </p>

    <h5>3 - COLLECTION OF PERSONAL INFORMATION</h5>
    <p>
      The Personal Information that is collected by Artizyou &copy; in connection with
      the use of its Website is voluntarily provided by the User when using the Website.
    </p>
    <p>
      In addition, the User agrees that Artizyou &copy; may collect certain Personal Information
      automatically, including but not limited to the type of mobile device you use, the IP address,
      the operating system of your device, the browser Internet you use, the domain name, access times,
      visit duration, reference URL, web platform, timestamp, and exit page information,
      as well as some information about how you use the Website.
    </p>
    <p>
      Artizyou &copy; will not retain the User's Personal Information beyond the time allowed by law and the latter will be
      deleted when it is no longer necessary for the purposes described in this Privacy Policy.
    </p>

    <h5>4 - How We Collect Non-Personal Information</h5>
    <p>
      Artizyou may obtain non-personal information from your use of our website and through the use of commonly-used
      information-gathering tools. These tools may include <strong>“Cookies,”</strong> which are pieces of information
      shared between your web browser and a website. Non-personal information may include information about the
      browser that you use to access the site, the operating system that you are running, what items you clicked on
      the applicable web page, how long you viewed a certain page, and information about the website you accessed
      immediately before you accessed our website. ARTIZYOU may aggregate your non-personal information with the
      non-personal information of other users of ARTIZYOU’s website or of other non-personal information collected
      offline. ARTIZYOU also may collect anonymous aggregated information, like general traffic patterns within our
      website, to help maintain the flow and content of the website. Any and all of this non-personal information may
      be used to support ARTIZYOU’s commercial, marketing, and customer service activities, or for any other reason.
    </p>

    <h5>5 - Use of Cookies</h5>
    <p>
      Use of cookies enables a faster and easier experience for the user. A cookie cannot read data off your computer’s
      hard drive. For information on cookies, please refer
      to <NormalLinkWrapper href="https://www.aboutcookies.org/">www.aboutcookies.org</NormalLinkWrapper>.
    </p>
    <p>There are different kinds of cookies with different functions:</p>
    <div className="table-container">
      <div className="table-row-container">
        <div className="table-column-first">Session cookies</div>
        <div className="table-column-second">
          These are only stored on your computer during your web session. They are automatically deleted when the
          browser is closed.  They usually store an anonymous session ID allowing you to browse a website without
          having to log in to each page. They do not collect any information from your computer.
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">Persistent cookies</div>
        <div className="table-column-second">
          A persistent cookie is one stored as a file on your computer, and it remains there when you close your web
          browser. The cookie can be read by the website that created it when you visit that website again.
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">First-party cookies</div>
        <div className="table-column-second">
          The function of this type of cookie is to retain your preferences for a particular website for the entity
          that owns that website. They are stored and sent between ARTIZYOU’s servers and your computer’s hard
          drive. They are not used for anything other than for personalization as set by you. These cookies may be
          either Session or Persistent cookies.
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">Third-party cookies</div>
        <div className="table-column-second">
          The function of this type of cookie is to retain your interaction with a particular website for an entity
          that does not own that website. They are stored and sent between the third-party’s server and your computer’s
          hard drive. These cookies are usually Persistent cookies.
        </div>
      </div>
    </div>

    <br/>

    <p>We generally use cookies as follows:</p>

    <div className="table-container">
      <div className="table-row-container">
        <div className="table-column-first">Functionality</div>
        <div className="table-column-second">
          Some cookies allow our Sites to remember choices you make (such as your user name, language or the region you
          are in) and provide enhanced features. For instance, a Site may be able to remember your login details, so
          that you do not have to repeatedly sign in to your account when using a particular device to access our
          Sites. These cookies can also be used to remember changes you have made to text size, font and other parts
          of web pages that you can customize. They may also be used to provide services you have requested such as
          viewing a video or commenting on an article. The information these cookies collect is usually
          anonymized. They do not gather any information about you that could be used for advertising or remember
          where you have been on the internet
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">Performance</div>
        <div className="table-column-second">
          Some cookies collect information about how visitors use a Site, for instance which pages visitors go to most
          often, and if they get error messages from web pages.  They also allow us to record and count the number of
          visitors to a Site, all of which enables us to see how visitors use a Site in order to improve the way that
          the Site works.  The information these cookies collect is normally anonymous and is used to improve how our
          Sites works. However, some of these cookies may include Personal Information.  Please consult your web
          browser’s ‘Help’ documentation or visit www.aboutcookies.org. for more information about how to turn
          cookies on and off for your browser
        </div>
      </div>
      <div className="table-row-container">
        <div className="table-column-first">Marketing</div>
        <div className="table-column-second">
          These cookies are used to deliver content relevant to your interests on a Site and third party sites based
          on how you interact with our advertisements or content
        </div>
      </div>
    </div>

    <br/>

    <h6 className="privacy-policy-subheading">Use of Web Beacons</h6>
    <p>
      Other tools include <strong>“Web Beacons,”</strong> which are clear electronic images that can recognize certain types of
      information on your computer, such as cookies, when you view our website tied to the web beacon, and a
      description of the website tied to the web beacon. ARTIZYOU may use web beacons to operate and improve our
      website and e-mail communications.  Web beacons can be used alone or in conjunction with cookies to compile
      information about users’ usage of our website and interaction with e-mails.  ARTIZYOU may use information from
      web beacons in combination with other data we have about our clients to provide you with information about
      ARTIZYOU and our services.  ARTIZYOU may conduct this review on an anonymous basis.
    </p>

    <h6 className="privacy-policy-subheading">Use of Google Analytics</h6>
    <p>
      ARTIZYOU may use Google Analytics, a web analytics service provided by Google, Inc. (<strong>“Google”</strong>).
      Google Analytics uses cookies to help websites and apps analyze how users use the site. The information generated
      by the cookie about your use of our website (including your IP address) will be transmitted to and stored by
      Google on servers in the United States.  Google will use this information for the purpose of evaluating
      your use of the applicable website, compiling reports on website activity, and providing other services relating
      to website activity and internet usage for ARTIZYOU. Google may also transfer this information to third parties
      where required to do so by law, or where such third parties process the information on Google’s
      behalf. You may refuse the use of cookies by selecting the appropriate settings on your browser, however, please note
      that if you do this you may not be able to use the full functionality of our website.  By using
      our website, you consent to the processing of data about you by Google in the manner and for the purposes set out above.
    </p>

    <h6 className="privacy-policy-subheading">Links To Other Websites:</h6>
    <p>
      Our website or App may contain third-party links that provide access to other websites or Apps, not maintained
      by ARTIZYOU or its affiliates.  If you click on these third-party links, you will be directed from our website to
      another external website, which ARTIZYOU has no control over and assumes no responsibility for the content,
      privacy policies, practices, or services.  Your use of any external website
      is not governed by this privacy policy.
    </p>

    <h6 className="privacy-policy-subheading">Children’s Privacy:</h6>
    <p>
      Artizyou  does not knowingly solicit, collect, or retain information from any individuals who are under fourteen
      (14) years of age.  If we learn that we have obtained personal information of a child under 14, we will take
      steps to delete the information as soon as possible.
    </p>

    <h6 className="privacy-policy-subheading">Consent to Use of Personal Information:</h6>
    <p>
      You consent to these processes by providing information including PII or applying for particular job openings at
      ARTIZYOU.  You may update your PII or “opt out” from receiving certain communications and correspondence from us
      at any time through email correspondence sent
      to <NormalLinkWrapper href="mailto:info@artizyou.com">info@artizyou.com</NormalLinkWrapper> .
    </p>

    <h6 className="privacy-policy-subheading">Rights of Data Owners in and to their Personal Information:</h6>
    <p>
      Where applicable law requires (and subject to any exceptions), you may have the right to request Artizyou© to
      provide you with your PII or to delete your PII that is held by us.  You may also have the right to restrict or
      object to use or processing of your PII.  Artizyou© will respond in a reasonable timely manner to requests made
      by you for access to such information.  You may exercise these rights by contacting us through email
      correspondence sent to <NormalLinkWrapper href="mailto:info@artizyou.com">info@artizyou.com</NormalLinkWrapper>.
    </p>

    <h5>6 - USE OF PERSONAL INFORMATION</h5>
    <p>
      The Personal Information that is requested from the User in connection with the use of the Artizyou &copy; Website is
      collected in order to personalize the experience of the latter on the Website and to facilitate communication
      with the companies listed. on the website.
    </p>
    <p>
      In addition, the User agrees that his Personal Information may be used so that Artizyou &copy; can send him
      essential communications concerning his services and operations via his email address, including, but not limited
      to, confirmations, additions or removal from Artizyou&copy;'s services, notifications of product enhancements,
      its newsletter, notices of discontinuance of the Website as well as notices of changes to the Terms of Use or
      this Privacy Policy.
    </p>
    <p>
      However, the User retains the possibility, whether at the time of registration or at any time thereafter,
      to refuse to receive any non-essential communications from Artizyou&copy;, including announcements and
      newsletters , using the link provided for this purpose to opt out of any future communications.
    </p>

    <h5>7 - USER CREATIONS</h5>
    <p>
      The User's Creations belong to him in full and no act or action of the User can, expressly or tacitly, constitute
      an assignment of his rights to any person whatsoever, in particular Artizyou&copy; and the other Users of the Website.
    </p>
    <p>
      Any information related to the User's Creations will be encrypted by Artizyou&copy; before being transmitted to the Blockchain.
    </p>
    <p>
      At the time of recordation of a Creation by the User, a copy of said Creation will be recorded on the servers of
      Artizyou&copy;, as well as a copy of the information of the Creator, including his name, the title of his work,
      the year of its creation, etc.
    </p>
    <p>
      The e-mail address of the User who submitted a Creation will be visible and public in the property history of the
      Creation. In addition, when a Creation is transacted by the User via the Website, information about this Creation
      and the transaction will be and will remain public, without the possibility of modification or deletion.
    </p>
    <p>
      A worksheet will be created by Artizyou&copy; when a Creation is submitted by the User, said form having
      remained private to the User and to the persons he authorizes to read it.
    </p>

    <h5>8 - COMMUNICATION AND DISCLOSURE OF PERSONAL INFORMATION</h5>
    <p>
      In connection with the use of the Website, Artizyou&copy; reserves the right to disclose the User's Personal Information as follows:
    </p>
    <p>
      When Artizyou&copy; considers it necessary to investigate, prevent or take action against illegal or suspected acts,
      to protect and defend the rights, property or safety of Artizyou&copy;, its users or other persons; and as part of the
      application of the Artizyou&copy; Terms of Use.
    </p>
    <p>
      With companies providing contract services to Artizyou&copy;, such as e-mail providers, hosting providers and payment
      service providers in accordance with this Privacy Policy. When the User's Personal Information is shared with a
      supplier, the latter will be contractually obliged to use his Personal Information in connection with his
      contractual obligations. Suppliers are not entitled to share the Personal User's Personal Information with other
      organizations or to contact it, unless expressly provided for in their contract with Artizyou&copy;.
    </p>
    <p>
      As required by law and where Artizyou&copy; believes disclosure is necessary to protect its rights and / or to comply
      with a court order or court proceeding. This includes, but is not limited to, fraud, technical problems or the
      deficiency of Artizyou's network or systems.
    </p>

    <h5>9 - PROTECTION OF PERSONAL INFORMATION</h5>
    <p>
      Artizyou&copy; provides physical, electronic and procedural safeguards to protect your Personal Information. In
      addition, Artizyou&copy; maintains industry standard data management and hosting practices that are designed to ensure
      the integrity and confidentiality of the User's Personal Information.
    </p>
    <p>
      Despite these practices, the User acknowledges that no method of electronic transmission or data hosting is
      completely safe and that no measure can prevent a potential security breach.
    </p>
    <p>
      Therefore, the User acknowledges that, to the extent that Artizyou&copy; complies with the standards set out above,
      the latter is not liable for damages suffered as a result of unauthorized access to his Personal Information or a breach of data.
    </p>
    <p>
      Upon request, Artizyou&copy; will remove any Personal Information that it is not required by law to keep.
    </p>

    <h5>10 - AMENDMENT TO TERMS AND CONDITIONS</h5>
    <p>
      Artizyou&copy; reserves the right to modify this Privacy Policy at any time without notice by posting the modified
      terms on the Website. The User who continues to use the Website after the modification of this Privacy Policy is
      presumed to have accepted it.
    </p>
    <p>
      The merger, sale or dissolution of Artizyou&copy; may also result in the transfer of your Personal Information
      to a related entity.
    </p>

    <h5>11 - QUESTIONS AND COMMENTS</h5>
      <p>
        If you have any questions regarding this Privacy Policy, please contact us directly by
        email at <NormalLinkWrapper href="mailto:contact@artizyou.com">contact@artizyou.com</NormalLinkWrapper>.
      </p>
      <p>
        <i>
          Last modification: June 2021
        </i>
      </p>
  </div>
);

const OtherLegalTerms = ({user}) => {
  const content = user.language === 'fr' ? PrivacyPolicyFR : PrivacyPolicyEN;

  return (
    <div className="container">
      {content}
    </div>);
};

export default WithUser(OtherLegalTerms);
