import React, {PureComponent} from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';

import BackIcon from "../images/icons/back.svg";
import Title from './Title';
import {withRouter} from "react-router-dom";
import withUser from '../containers/withUser';

const ListCircle = styled.div`
  display: inline-block;
  padding: 5px;
  margin-right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 40px;
  border: 2px solid;
  line-height: 20px;
  text-align: center;
`;

const PlagiarismWrapper = styled.div`

`;

const TitleWrapper = styled.div`
  margin-bottom: 45px;
  
  h1{
    margin-bottom: 15px;
    text-align: left;
  }
`;

const ExampleWrapper = styled.div`
  padding: 45px;
  border:1px solid #a2a2a2;
  font-style: italic;
`;

const ContentWrapper = styled.div`
  margin: 1rem 0 2.5rem 0;

  h2{
    text-align: left;
    margin: 1rem 0;
    color: ${props => props.theme.artz.primaryColor};
  }
  
  ul{
    li{
      a{
        color: #0861af;
        text-decoration: underline;
        
        &:hover{
          color: ${props => props.theme.artz.primaryColor};
        }
      }
    }
  }
`;

const BackLinkWrapper = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

const BackLink = styled.span`
  padding: 10px;
  color: ${props => props.theme.artz.primaryColor};
  cursor: pointer;
  font-size: 0.8rem;
  text-transform: uppercase;
`;


const BackLinkIcon = styled(BackIcon)`
  margin-right: 10px;
`;

class PlagiarismHelpGuide extends PureComponent {

  renderContentFR = () => {
    const {history} = this.props;

    return (
      <PlagiarismWrapper>
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <BackLinkWrapper>
                <BackLink onClick={history.goBack}><BackLinkIcon/> retour</BackLink>
              </BackLinkWrapper>
              <TitleWrapper>
                <Title>Tu t'es fait copier ou plagier?</Title>
                <p>Nous t'invitons à suivre scrupuleusement les étapes suivantes :</p>
              </TitleWrapper>

              <ContentWrapper>
                <h2>
                  <ListCircle>1</ListCircle>
                  Garde ton calme
                </h2>
                <p>
                  N'utilise surtout pas les médias sociaux pour tenter de dénoncer la situation. Garde une démarche confidentielle entre toi et la personne fautive, qu’elle soit physique ou morale.
                </p>
              </ContentWrapper>

              <ContentWrapper>
                <h2>
                  <ListCircle>2</ListCircle>
                  Identifie la personne fautive
                </h2>
                <p>
                  Utilise le web pour identifier clairement la personne fautive. Dans le cas d'un média social : cherche le profil de la personne, c'est le moyen le plus simple dont tu disposes. Dans le cas d'un site web : identifie l'agence, le pigiste ou le webmaster qui a créé le site. Dans le cas d'une boutique en ligne ou de tout autre outil commercial : identifie l'administrateur responsable de la commercialisation de la copie de ta création.
                </p>
              </ContentWrapper>

              <ContentWrapper>
                <h2>
                  <ListCircle>3</ListCircle>
                  Première action
                </h2>
                <p>
                  Envoie un courriel professionnel à la personne fautive. Tu peux t'inspirer de l'exemple qui suit:
                </p>

                <ExampleWrapper>
                  <p>Monsieur, Madame,</p>
                  <p>J’ai pris connaissance que vous avez utilisé sans ma permission une création qui m’appartient, voir photo ci-jointe. (Insérer la photo de votre création copiée)</p>
                  <p>Je bénéficie d’un e-brevet prouvant l’authenticité et la propriété intellectuelle de cette œuvre (voir ci-joint) (Insérer la copie PDF de votre certificat Artizyou)</p>
                  <p>En conséquence, et sans douter de votre bonne foi, je vous demande de prendre contact avec moi afin de régulariser ce litige, et ce, dans les X jours suivant la réception de ce courriel.</p>
                  <p>Voici mes coordonnés :</p>
                  <ul>
                    <li>Nom et Prénom</li>
                    <li>Téléphone</li>
                    <li>Courriel</li>
                    <li>Skype ou autre</li>
                  </ul>
                  <p>Nom et prénom + signature</p>
                </ExampleWrapper>

                <p>
                  En cas de non retour de la personne fautive, nous te proposons d’essayer, si possible, de la contacter par téléphone ou d’envoyer le contenu du courriel via les messageries privées de leurs médias sociaux.
                </p>
              </ContentWrapper>

              <ContentWrapper>
                <h2>
                  <ListCircle>4</ListCircle>
                  Dans le cas d’une non obtempération
                </h2>
                <p>
                  Dans le cas d’une non obtempération, nous allons t'orienter vers l’option de mise en demeure :
                </p>

                <ul>
                  <li>
                    Inspire-toi du lien suivant: <a href="https://www.educaloi.qc.ca/capsules/comment-ecrire-une-lettre-de-mise-en-demeure">Écrire une lettre de mise en demeure</a>
                  </li>
                  <li>Ou fais appel à un professionnel du droit:</li>
                </ul>
              </ContentWrapper>

              <ContentWrapper>
                <h2>
                  Autres ressources
                </h2>
                <p>
                  Voici d’autres moyens ainsi que des liens utiles en cas de complications associées à des moyens financiers limités:
                </p>

                <ul>
                  <li>
                    <a target="_blank" href="http://www4.gouv.qc.ca/FR/Portail/Citoyens/Evenements/consommateur-renseignement-plainte/Pages/deposer-demande-petites-creances.aspx">Déposer une demande aux petites créances</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://www.justice.gouv.qc.ca/vos-differends/les-petites-creances">Les petites créances</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://www.lawyers.com/legal-info/consumer-law/us-small-claims-court/small-claims-court-in-your-state.html">Small Claims Court In Your State (Anglais)</a>
                  </li>
                </ul>
              </ContentWrapper>
            </div>
          </div>
        </div>
      </PlagiarismWrapper>
    );
  };

  renderContentEN = () => {
    const {history} = this.props;

    return (
      <PlagiarismWrapper>
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <BackLinkWrapper>
                <BackLink onClick={history.goBack}><BackLinkIcon/> back</BackLink>
              </BackLinkWrapper>
              <TitleWrapper>
                <Title>Have you been copied or plagiarized?</Title>
                <p>If yes, we invite you to carefully follow the following steps:</p>
              </TitleWrapper>

              <ContentWrapper>
                <h2>
                  <ListCircle>1</ListCircle>
                  Keep calm
                </h2>
                <p>
                  Above all, do not use social media to try to denounce the situation at first. Keep a confidential process between you and the person at fault, whether the person is physical or moral.                </p>
              </ContentWrapper>

              <ContentWrapper>
                <h2>
                  <ListCircle>2</ListCircle>
                  Identify the person at fault
                </h2>
                <p>
                  Use the web to clearly identify the person at fault. In the case of a social media: see the profile of the person, it is the simplest way. In the case of a website: identify the agency or the freelancer or the webmaster who created the site. In the case of an online store or another commercial tool: identify the administrator responsible for marketing the copy of your creation                </p>
              </ContentWrapper>

              <ContentWrapper>
                <h2>
                  <ListCircle>3</ListCircle>
                  First action
                </h2>
                <p>
                  Send a professional email to the person at fault as follows:
                </p>

                <ExampleWrapper>
                  <p>Sir, Madam,</p>
                  <p>I became aware that you have used without my permission a creation that belongs to me, see picture attached. <br/>(Insert the photo of your copied creation)</p>
                  <p>I benefit from an e-patent proving the authenticity and the intellectual property of this work, see attached. (Insert the PDF copy of your Artizyou certificate).</p>
                  <p>Consequently, without doubting your good faith, I ask you to contact me in order to regularize this dispute, and this, within X days following the reception of this email.</p>
                  <p>Here is my information:</p>
                  <ul>
                    <li>Last name and first name </li>
                    <li>Tel</li>
                    <li>E-mail</li>
                    <li>Skype or other</li>
                  </ul>
                  <p>Surname and first name + signature </p>
                </ExampleWrapper>
              </ContentWrapper>

              <ContentWrapper>
                <p>In case of non-return of the person at fault, we suggest you to try if to contact her by phone if possible or to send the same content of the email via the private courier of their social media.</p>
                <h2>
                  <ListCircle>4</ListCircle>
                  In the case of non-compliance
                </h2>
                <p>
                  We will direct you to the option of formal notice:
                </p>

                <ul>
                  <li>
                    Get inspired by the following link: <a href="https://www.educaloi.qc.ca/en/capsules/writing-demand-letter">https://www.educaloi.qc.ca/en/capsules/writing-demand-letter</a>
                  </li>
                  <li>Or call a legal professional</li>
                </ul>
              </ContentWrapper>

              <ContentWrapper>
                <h2>
                  Other ressources
                </h2>
                <p>
                  Here are other ways and useful links in case of complications associated with limited financial means:                </p>

                <ul>
                  <li>
                    <a target="_blank" href="https://www.lawyers.com/legal-info/consumer-law/us-small-claims-court/small-claims-court-in-your-state.html">Small Claims Court In Your State</a>
                  </li>
                  <li>
                    <a target="_blank" href="http://www4.gouv.qc.ca/FR/Portail/Citoyens/Evenements/consommateur-renseignement-plainte/Pages/deposer-demande-petites-creances.aspx">Déposer une demande aux petites créances (French)</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://www.justice.gouv.qc.ca/vos-differends/les-petites-creances">Les petites créances (French)</a>
                  </li>
                </ul>
              </ContentWrapper>
            </div>
          </div>
        </div>
      </PlagiarismWrapper>
    );
  };

  render() {
    const {user} = this.props;
    const {language} = user;

    if (language === 'en') {
      return this.renderContentEN();
    }
    return this.renderContentFR();
  }
}


export default withRouter(withUser(PlagiarismHelpGuide));