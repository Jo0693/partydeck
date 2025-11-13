"use client";

import { useState, useEffect } from "react";
import { Card, H1, Sub, FadeIn } from "@/components/UI";
import { motion } from "framer-motion";

type NhiCategoryId =
  | "basic"
  | "spicy"
  | "hot"
  | "hardcore"
  | "gross"
  | "illicit"
  | "travel"
  | "work_school"
  | "online"
  | "couple";

type DuoModeId = "duo_soft" | "duo_spicy" | "duo_fun" | "duo_honest";

const PROMPTS_BY_CATEGORY: Record<NhiCategoryId, string[]> = {
  basic: [
    "Je n'ai jamais voyagé seul(e) à l'étranger.",
    "Je n'ai jamais dormi sur la plage.",
    "Je n'ai jamais oublié l'anniversaire d'un ami proche.",
    "Je n'ai jamais testé un sport extrême.",
    "Je n'ai jamais chanté en public.",
    "Je n'ai jamais fait de road trip spontané.",
    "Je n'ai jamais cuisiné un plat complètement raté.",
    "Je n'ai jamais fait de bénévolat.",
    "Je n'ai jamais parlé seul(e) à voix haute en pensant être seul(e).",
    "Je n'ai jamais oublié où j'avais garé ma voiture.",
    "Je n'ai jamais raté un train ou un avion.",
    "Je n'ai jamais fait de camping sauvage.",
    "Je n'ai jamais gagné un concours.",
    "Je n'ai jamais perdu mon portefeuille.",
    "Je n'ai jamais mangé quelque chose que j'avais fait tomber par terre.",
    "Je n'ai jamais appris à jouer d'un instrument de musique.",
    "Je n'ai jamais cassé mon téléphone en le faisant tomber.",
    "Je n'ai jamais dansé sous la pluie.",
    "Je n'ai jamais écrit une lettre à la main à quelqu'un.",
    "Je n'ai jamais fait du shopping le Black Friday.",
    "Je n'ai jamais regardé le lever du soleil volontairement.",
    "Je n'ai jamais participé à un marathon ou une course.",
    "Je n'ai jamais essayé de faire pousser une plante et échoué.",
    "Je n'ai jamais pris un bain de minuit.",
    "Je n'ai jamais appelé quelqu'un par le mauvais prénom pendant des mois.",
    "Je n'ai jamais mangé un plat typique que je ne connaissais pas du tout.",
    "Je n'ai jamais fait une sieste en public (transports, parc, etc).",
    "Je n'ai jamais passé une nuit blanche à parler avec quelqu'un.",
    "Je n'ai jamais essayé de réparer quelque chose et empiré la situation.",
    "Je n'ai jamais raconté la même histoire deux fois à la même personne.",
  ],
  spicy: [
    "Je n'ai jamais embrassé quelqu'un le premier soir.",
    "Je n'ai jamais eu un rencard catastrophique.",
    "Je n'ai jamais envoyé un message osé à la mauvaise personne.",
    "Je n'ai jamais menti sur mon âge sur une app de rencontre.",
    "Je n'ai jamais eu un crush sur un(e) ami(e) proche.",
    "Je n'ai jamais fait semblant d'aimer un cadeau.",
    "Je n'ai jamais eu un rencard qui a fini plus chaud que prévu.",
    "Je n'ai jamais flirté pour obtenir quelque chose.",
    "Je n'ai jamais envoyé une photo suggestive.",
    "Je n'ai jamais embrassé deux personnes le même jour.",
    "Je n'ai jamais eu un coup de cœur pour le/la partenaire d'un(e) ami(e).",
    "Je n'ai jamais eu un plan cul qui s'est transformé en relation.",
    "Je n'ai jamais fait semblant d'avoir un rendez-vous pour éviter quelqu'un.",
    "Je n'ai jamais raconté un mensonge à un rencard pour l'impressionner.",
    "Je n'ai jamais utilisé Tinder ou une app de rencontre au travail.",
    "Je n'ai jamais embrassé quelqu'un juste pour rendre quelqu'un d'autre jaloux.",
    "Je n'ai jamais eu un rendez-vous galant en cachette.",
    "Je n'ai jamais flirté avec deux personnes en même temps sans qu'elles le sachent.",
    "Je n'ai jamais regretté d'avoir donné mon numéro à quelqu'un.",
    "Je n'ai jamais fantasmé sur quelqu'un pendant un rendez-vous avec quelqu'un d'autre.",
    "Je n'ai jamais fait semblant de ne pas connaître quelqu'un après une soirée.",
    "Je n'ai jamais eu un rencard dans un endroit totalement inapproprié.",
    "Je n'ai jamais embrassé quelqu'un dont je ne connaissais pas le nom.",
    "Je n'ai jamais dragué quelqu'un en utilisant une phrase d'accroche ridicule.",
    "Je n'ai jamais eu un crush pour quelqu'un beaucoup plus jeune ou âgé que moi.",
    "Je n'ai jamais simulé de l'intérêt pour quelqu'un juste pour ne pas le/la blesser.",
    "Je n'ai jamais embrassé quelqu'un que je ne trouvais pas vraiment attirant(e).",
    "Je n'ai jamais eu un rencard avec quelqu'un que j'avais rencontré en ligne sans le dire à personne.",
    "Je n'ai jamais eu un moment gênant lors d'un premier baiser.",
    "Je n'ai jamais donné un faux numéro pour me débarrasser de quelqu'un.",
  ],
  hot: [
    "Je n'ai jamais eu une aventure d'un soir dont je ne me souviens pas vraiment.",
    "Je n'ai jamais participé à un jeu coquin en soirée.",
    "Je n'ai jamais fait quelque chose de très intime dans un lieu public.",
    "Je n'ai jamais regardé du contenu 18+ avec quelqu'un d'autre.",
    "Je n'ai jamais eu une relation purement physique sans sentiments.",
    "Je n'ai jamais envoyé une photo très osée que je regrette.",
    "Je n'ai jamais eu des fantasmes sur quelqu'un de totalement inattendu.",
    "Je n'ai jamais fait un strip poker ou un jeu similaire.",
    "Je n'ai jamais eu une relation secrète que personne ne connaissait.",
    "Je n'ai jamais trompé quelqu'un.",
    "Je n'ai jamais été attiré(e) par plusieurs personnes en même temps.",
    "Je n'ai jamais eu une aventure avec quelqu'un que je venais de rencontrer.",
    "Je n'ai jamais participé à un plan à trois ou plus.",
    "Je n'ai jamais eu une relation avec quelqu'un en couple.",
    "Je n'ai jamais exploré un fantasme que je n'aurais jamais imaginé essayer.",
    "Je n'ai jamais eu une nuit dont je ne peux parler à personne.",
    "Je n'ai jamais utilisé un jouet intime.",
    "Je n'ai jamais eu une attirance physique incontrôlable pour quelqu'un.",
    "Je n'ai jamais tenté quelque chose d'audacieux au lit pour la première fois.",
    "Je n'ai jamais eu une relation physique avec un(e) ex après la rupture.",
    "Je n'ai jamais fait quelque chose d'intime dans un lieu complètement interdit.",
    "Je n'ai jamais eu un plan cul régulier pendant des mois.",
    "Je n'ai jamais été dans une situation compromettante avec quelqu'un d'inattendu.",
    "Je n'ai jamais eu une attirance physique pour quelqu'un que je détestais.",
    "Je n'ai jamais fantasmé sur quelqu'un pendant un moment intime avec quelqu'un d'autre.",
    "Je n'ai jamais eu une expérience qui a complètement changé ma vision de la sexualité.",
    "Je n'ai jamais eu une relation purement basée sur l'attirance physique pendant plus d'un an.",
    "Je n'ai jamais essayé quelque chose que j'avais vu dans un film pour adultes.",
    "Je n'ai jamais eu une aventure avec quelqu'un que je n'aurais jamais imaginé.",
    "Je n'ai jamais menti sur mon nombre de partenaires.",
  ],
  hardcore: [
    "Je n'ai jamais fait un truc vraiment dangereux pour épater quelqu'un.",
    "Je n'ai jamais menti à mes parents sur quelque chose de grave.",
    "Je n'ai jamais passé une nuit en garde à vue.",
    "Je n'ai jamais participé à une bagarre.",
    "Je n'ai jamais eu une crise de panique en public.",
    "Je n'ai jamais fait une connerie qui aurait pu me coûter très cher.",
    "Je n'ai jamais trahi la confiance d'un(e) ami(e) proche.",
    "Je n'ai jamais menti sur quelque chose de vraiment important.",
    "Je n'ai jamais eu envie de tout plaquer et disparaître.",
    "Je n'ai jamais fait semblant d'être quelqu'un d'autre en ligne.",
    "Je n'ai jamais fait quelque chose dont j'ai vraiment honte.",
    "Je n'ai jamais eu des pensées vraiment sombres que je n'ai jamais osé partager.",
    "Je n'ai jamais blessé volontairement quelqu'un émotionnellement.",
    "Je n'ai jamais fait quelque chose d'irréversible que je regrette profondément.",
    "Je n'ai jamais eu une addiction à quelque chose (jeu, alcool, autre).",
    "Je n'ai jamais pensé sérieusement à quitter mon pays définitivement.",
    "Je n'ai jamais été impliqué(e) dans un accident grave.",
    "Je n'ai jamais volé quelque chose de grande valeur.",
    "Je n'ai jamais vécu une situation où j'ai vraiment eu peur pour ma vie.",
    "Je n'ai jamais fait quelque chose d'illégal qui aurait pu me mener en prison.",
    "Je n'ai jamais coupé les ponts avec ma famille pendant longtemps.",
    "Je n'ai jamais eu un secret si lourd que ça m'empêche de dormir.",
    "Je n'ai jamais saboté volontairement la vie de quelqu'un.",
    "Je n'ai jamais eu des pensées suicidaires.",
    "Je n'ai jamais été dans une situation où j'ai dû choisir entre deux personnes que j'aimais.",
    "Je n'ai jamais fait quelque chose que je ne pourrai jamais pardonner à moi-même.",
    "Je n'ai jamais eu une dépendance émotionnelle toxique à quelqu'un.",
    "Je n'ai jamais été dans une relation vraiment abusive.",
    "Je n'ai jamais fait quelque chose de terrible par vengeance.",
    "Je n'ai jamais eu une période sombre où je ne me reconnaissais plus.",
  ],
  gross: [
    "Je n'ai jamais vomi en public à cause de l'alcool.",
    "Je n'ai jamais fait pipi dans une piscine (en étant adulte).",
    "Je n'ai jamais senti mes pieds devant d'autres personnes.",
    "Je n'ai jamais gardé le même vêtement plusieurs jours d'affilée.",
    "Je n'ai jamais mangé quelque chose qui était périmé depuis longtemps.",
    "Je n'ai jamais oublié de me brosser les dents pendant 2 jours.",
    "Je n'ai jamais eu un accident embarrassant aux toilettes.",
    "Je n'ai jamais recraché de la nourriture en public.",
    "Je n'ai jamais eu une hygiène douteuse pendant un voyage.",
    "Je n'ai jamais mangé directement dans une poubelle (type restes).",
    "Je n'ai jamais reniflé un vêtement pour savoir si je pouvais le porter encore.",
    "Je n'ai jamais laissé de la vaisselle sale pendant plus d'une semaine.",
    "Je n'ai jamais eu une intoxication alimentaire à cause de ma propre cuisine.",
    "Je n'ai jamais utilisé les toilettes avec quelqu'un d'autre dans la pièce.",
    "Je n'ai jamais mangé quelque chose tombé par terre en public.",
    "Je n'ai jamais porté des sous-vêtements à l'envers parce qu'ils étaient sales.",
    "Je n'ai jamais eu des champignons aux pieds ou ongles.",
    "Je n'ai jamais pété bruyamment en public et fait semblant que ce n'était pas moi.",
    "Je n'ai jamais partagé une brosse à dents avec quelqu'un.",
    "Je n'ai jamais bu directement à une bouteille/carton de lait dans le frigo.",
    "Je n'ai jamais eu un rendez-vous alors que j'avais une hygiène douteuse.",
    "Je n'ai jamais mangé avec les mains un plat qui nécessitait des couverts.",
    "Je n'ai jamais eu un problème digestif embarrassant en public.",
    "Je n'ai jamais oublié de me laver les mains après être allé(e) aux toilettes.",
    "Je n'ai jamais utilisé des couverts tombés par terre sans les laver.",
    "Je n'ai jamais eu des crottes de nez en public sans m'en rendre compte.",
    "Je n'ai jamais porté le même sous-vêtement plusieurs jours de suite.",
    "Je n'ai jamais mangé quelque chose directement sorti d'une poubelle propre.",
    "Je n'ai jamais léché mes doigts sales en public.",
    "Je n'ai jamais craché par terre en public.",
  ],
  illicit: [
    "Je n'ai jamais conduit sans permis.",
    "Je n'ai jamais volé quelque chose dans un magasin.",
    "Je n'ai jamais utilisé une fausse identité.",
    "Je n'ai jamais fait quelque chose d'illégal que personne n'a découvert.",
    "Je n'ai jamais fraudé dans les transports en commun.",
    "Je n'ai jamais pénétré dans un lieu interdit.",
    "Je n'ai jamais vandalisé quelque chose.",
    "Je n'ai jamais consommé une substance interdite.",
    "Je n'ai jamais menti sur un document officiel.",
    "Je n'ai jamais téléchargé illégalement des films ou séries.",
    "Je n'ai jamais utilisé le WiFi du voisin sans permission.",
    "Je n'ai jamais revendu quelque chose qui ne m'appartenait pas.",
    "Je n'ai jamais fait un faux témoignage pour aider quelqu'un.",
    "Je n'ai jamais gardé quelque chose que j'ai trouvé et qui avait de la valeur.",
    "Je n'ai jamais conduit en ayant bu plus que la limite autorisée.",
    "Je n'ai jamais triché lors d'un examen officiel.",
    "Je n'ai jamais enfreint un couvre-feu ou règlement municipal.",
    "Je n'ai jamais utilisé un faux billet ou moyen de paiement.",
    "Je n'ai jamais traversé une frontière avec quelque chose d'interdit.",
    "Je n'ai jamais menti aux autorités pour éviter une amende.",
    "Je n'ai jamais acheté ou vendu quelque chose sur le marché noir.",
    "Je n'ai jamais falsifié une signature ou un document.",
    "Je n'ai jamais utilisé les informations de quelqu'un d'autre sans permission.",
    "Je n'ai jamais participé à une activité illégale en groupe.",
    "Je n'ai jamais aidé quelqu'un à enfreindre la loi.",
    "Je n'ai jamais caché quelque chose d'illégal pour quelqu'un.",
    "Je n'ai jamais menti sur mon identité pour accéder à quelque chose.",
    "Je n'ai jamais utilisé un faux diplôme ou certificat.",
    "Je n'ai jamais participé à une manifestation qui est devenue violente.",
    "Je n'ai jamais détourné des règles de manière vraiment limite.",
  ],
  travel: [
    "Je n'ai jamais raté mon vol à cause d'une erreur de ma part.",
    "Je n'ai jamais dormi dans un aéroport.",
    "Je n'ai jamais perdu mes bagages en voyage.",
    "Je n'ai jamais voyagé sans réservation d'hébergement.",
    "Je n'ai jamais visité plus de 5 pays.",
    "Je n'ai jamais fait du stop.",
    "Je n'ai jamais dormi à la belle étoile dans un pays étranger.",
    "Je n'ai jamais eu une intoxication alimentaire en voyage.",
    "Je n'ai jamais visité un continent autre que l'Europe.",
    "Je n'ai jamais fait un voyage complètement improvisé.",
    "Je n'ai jamais pris l'avion en première classe.",
    "Je n'ai jamais voyagé en solo pendant plus d'un mois.",
    "Je n'ai jamais raté une correspondance et dû dormir dans une gare/aéroport.",
    "Je n'ai jamais été arnaqué(e) dans un pays étranger.",
    "Je n'ai jamais voyagé dans un pays sans parler la langue du tout.",
    "Je n'ai jamais eu un problème avec mon passeport ou visa à la frontière.",
    "Je n'ai jamais fait un road trip de plus de 1000 km.",
    "Je n'ai jamais dormi dans un endroit vraiment bizarre en voyage (gare, banc, etc).",
    "Je n'ai jamais visité un pays considéré comme dangereux.",
    "Je n'ai jamais eu une aventure amoureuse lors d'un voyage.",
    "Je n'ai jamais oublié quelque chose d'important dans un hôtel ou transport.",
    "Je n'ai jamais fait un voyage dont je suis revenu(e) plus fatigué(e) qu'avant.",
    "Je n'ai jamais voyagé en train de nuit.",
    "Je n'ai jamais fait un voyage uniquement pour la nourriture locale.",
    "Je n'ai jamais eu une urgence médicale en voyage à l'étranger.",
    "Je n'ai jamais voyagé avec un budget de moins de 10€ par jour.",
    "Je n'ai jamais fait du couchsurfing chez des inconnus.",
    "Je n'ai jamais raté mon train/bus et dû improviser complètement.",
    "Je n'ai jamais voyagé dans un pays sans assurance voyage.",
    "Je n'ai jamais fait un voyage en sac à dos pendant plusieurs semaines.",
  ],
  work_school: [
    "Je n'ai jamais séché un cours ou une journée de travail sans raison.",
    "Je n'ai jamais copié sur quelqu'un lors d'un examen.",
    "Je n'ai jamais eu un crush sur un(e) prof ou collègue.",
    "Je n'ai jamais menti sur mon CV.",
    "Je n'ai jamais envoyé un email embarrassant par erreur au travail.",
    "Je n'ai jamais dormi pendant un cours ou une réunion.",
    "Je n'ai jamais fait un travail de groupe en ne faisant rien.",
    "Je n'ai jamais été viré(e) ou renvoyé(e).",
    "Je n'ai jamais pleuré au travail ou à l'école.",
    "Je n'ai jamais volé quelque chose au bureau.",
    "Je n'ai jamais fait semblant d'être malade pour ne pas aller travailler/étudier.",
    "Je n'ai jamais utilisé le matériel du bureau/école à des fins personnelles.",
    "Je n'ai jamais eu une dispute sérieuse avec un(e) collègue ou camarade.",
    "Je n'ai jamais raté une deadline importante par pure procrastination.",
    "Je n'ai jamais menti sur mes qualifications ou compétences.",
    "Je n'ai jamais été impliqué(e) dans des ragots au travail ou à l'école.",
    "Je n'ai jamais fait une présentation complètement improvisée.",
    "Je n'ai jamais pris le crédit pour le travail de quelqu'un d'autre.",
    "Je n'ai jamais eu une relation amoureuse secrète au travail ou à l'école.",
    "Je n'ai jamais démissionné ou abandonné quelque chose sans préavis.",
    "Je n'ai jamais passé plus de temps sur mon téléphone que sur mon travail.",
    "Je n'ai jamais inventé une excuse complètement fausse pour justifier un retard.",
    "Je n'ai jamais fait semblant de comprendre quelque chose que je ne comprenais pas du tout.",
    "Je n'ai jamais saboté le travail de quelqu'un par jalousie.",
    "Je n'ai jamais eu une altercation verbale violente avec un supérieur.",
    "Je n'ai jamais utilisé une excuse familiale fausse pour m'absenter.",
    "Je n'ai jamais passé un entretien sans vraiment vouloir le poste.",
    "Je n'ai jamais menti sur mes horaires de disponibilité.",
    "Je n'ai jamais fait semblant de travailler alors que je ne faisais rien.",
    "Je n'ai jamais critiqué mon boss/prof dans son dos de manière vraiment méchante.",
  ],
  online: [
    "Je n'ai jamais stalké mon ex sur les réseaux sociaux.",
    "Je n'ai jamais créé un faux profil en ligne.",
    "Je n'ai jamais ghosté quelqu'un après plusieurs rendez-vous.",
    "Je n'ai jamais envoyé un message privé à quelqu'un que je ne connaissais pas.",
    "Je n'ai jamais supprimé un post à cause des commentaires.",
    "Je n'ai jamais été bloqué(e) par quelqu'un sur les réseaux.",
    "Je n'ai jamais menti sur ma vie en ligne pour paraître mieux.",
    "Je n'ai jamais acheté des followers ou des likes.",
    "Je n'ai jamais passé plus de 5 heures d'affilée sur les réseaux sociaux.",
    "Je n'ai jamais eu une dispute uniquement par messages.",
    "Je n'ai jamais regardé le profil de quelqu'un en cachette (mode privé/anonyme).",
    "Je n'ai jamais partagé une photo de quelqu'un sans sa permission.",
    "Je n'ai jamais menti sur mon apparence sur une photo de profil.",
    "Je n'ai jamais vérifié si quelqu'un a vu mon message et stressé à ce sujet.",
    "Je n'ai jamais supprimé et reposté la même chose pour avoir plus de likes.",
    "Je n'ai jamais eu une dispute avec quelqu'un que je n'ai jamais rencontré IRL.",
    "Je n'ai jamais comparé ma vie à celle des autres sur les réseaux et été jaloux(se).",
    "Je n'ai jamais posté quelque chose juste pour rendre quelqu'un jaloux.",
    "Je n'ai jamais fait semblant de ne pas voir un message pour jouer.",
    "Je n'ai jamais été dans un groupe de discussion toxique.",
    "Je n'ai jamais scrollé les réseaux au lieu de dormir jusqu'à 3h du matin.",
    "Je n'ai jamais regretté un commentaire ou post publié sous le coup de l'émotion.",
    "Je n'ai jamais utilisé une app de rencontre juste pour le divertissement.",
    "Je n'ai jamais archivé ou masqué des posts pour que certaines personnes ne les voient pas.",
    "Je n'ai jamais créé un compte finsta (faux Instagram) secret.",
    "Je n'ai jamais vérifié combien de fois quelqu'un a vu ma story.",
    "Je n'ai jamais unfollowé quelqu'un par rancune.",
    "Je n'ai jamais menti sur ma localisation sur les réseaux sociaux.",
    "Je n'ai jamais posté une photo retouchée en prétendant qu'elle était naturelle.",
    "Je n'ai jamais eu une obsession malsaine pour les likes et commentaires.",
  ],
  couple: [
    "Je n'ai jamais dit 'je t'aime' sans le penser vraiment.",
    "Je n'ai jamais eu une relation à distance.",
    "Je n'ai jamais espionné le téléphone de mon/ma partenaire.",
    "Je n'ai jamais menti à mon/ma partenaire sur où j'étais.",
    "Je n'ai jamais été en couple avec deux personnes en même temps.",
    "Je n'ai jamais oublié un anniversaire de couple.",
    "Je n'ai jamais fait semblant d'apprécier un(e) ami(e) de mon/ma partenaire.",
    "Je n'ai jamais rompu par message.",
    "Je n'ai jamais eu envie de rompre mais ne pas avoir osé.",
    "Je n'ai jamais eu une relation qui a duré moins d'une semaine.",
    "Je n'ai jamais été jaloux(se) au point de faire quelque chose de fou.",
    "Je n'ai jamais fouillé dans les affaires de mon/ma partenaire.",
    "Je n'ai jamais fait semblant d'aimer quelque chose pour plaire à mon/ma partenaire.",
    "Je n'ai jamais pleuré à cause d'une rupture.",
    "Je n'ai jamais eu un doute sérieux sur mon/ma partenaire sans en parler.",
    "Je n'ai jamais été tenté(e) de tromper mon/ma partenaire.",
    "Je n'ai jamais fait un gros mensonge dans une relation.",
    "Je n'ai jamais regretté d'être entré(e) en couple avec quelqu'un.",
    "Je n'ai jamais eu une dispute qui a failli tout détruire.",
    "Je n'ai jamais comparé mon/ma partenaire à un(e) ex.",
    "Je n'ai jamais passé plus de temps sur mon téléphone qu'avec mon/ma partenaire.",
    "Je n'ai jamais remis en question toute ma relation à cause d'un détail.",
    "Je n'ai jamais été en couple juste pour ne pas être seul(e).",
    "Je n'ai jamais caché une relation à mes proches.",
    "Je n'ai jamais eu un red flag majeur dès le début mais continué quand même.",
    "Je n'ai jamais menti sur mon passé amoureux.",
    "Je n'ai jamais eu des sentiments pour quelqu'un d'autre pendant ma relation.",
    "Je n'ai jamais rompu avec quelqu'un puis regretté immédiatement.",
    "Je n'ai jamais fait semblant d'être d'accord avec mon/ma partenaire pour éviter un conflit.",
    "Je n'ai jamais eu une relation toxique dont je n'arrivais pas à sortir.",
  ],
};

const PROMPTS_DUO: Record<DuoModeId, string[]> = {
  duo_soft: [
    "Je n'ai jamais eu un coup de foudre au premier regard.",
    "Je n'ai jamais cru aux âmes sœurs.",
    "Je n'ai jamais pleuré en regardant un film romantique.",
    "Je n'ai jamais écrit une lettre d'amour.",
    "Je n'ai jamais gardé un objet qui me rappelle quelqu'un de spécial.",
    "Je n'ai jamais cru à l'amour éternel.",
    "Je n'ai jamais eu des papillons dans le ventre en pensant à quelqu'un.",
    "Je n'ai jamais rêvé de ma vie future avec quelqu'un.",
    "Je n'ai jamais eu peur de perdre quelqu'un de vraiment important.",
    "Je n'ai jamais dit à quelqu'un qu'il/elle était important(e) pour moi.",
    "Je n'ai jamais ressenti une connexion instantanée avec quelqu'un.",
    "Je n'ai jamais eu l'impression qu'on se connaissait depuis toujours.",
    "Je n'ai jamais voulu protéger quelqu'un de tout mon cœur.",
    "Je n'ai jamais souri en repensant à un souvenir avec quelqu'un.",
    "Je n'ai jamais eu envie de passer tout mon temps avec une personne.",
    "Je n'ai jamais ressenti une affection profonde et sincère.",
    "Je n'ai jamais eu une conversation qui a duré toute la nuit.",
    "Je n'ai jamais partagé mes rêves les plus secrets avec quelqu'un.",
    "Je n'ai jamais ressenti un calme profond en présence de quelqu'un.",
    "Je n'ai jamais eu l'impression d'être vraiment compris(e) par quelqu'un.",
    "Je n'ai jamais ressenti une tendresse immense pour quelqu'un.",
    "Je n'ai jamais voulu faire plaisir à quelqu'un juste pour voir son sourire.",
    "Je n'ai jamais eu l'impression que le temps s'arrêtait avec quelqu'un.",
    "Je n'ai jamais ressenti une douceur inexplicable en pensant à quelqu'un.",
    "Je n'ai jamais voulu créer des souvenirs précieux avec quelqu'un.",
    "Je n'ai jamais eu un moment magique que je n'oublierai jamais.",
    "Je n'ai jamais ressenti une complicité immédiate avec quelqu'un.",
    "Je n'ai jamais voulu connaître tous les détails de la vie de quelqu'un.",
    "Je n'ai jamais eu l'impression d'avoir trouvé quelqu'un de vraiment spécial.",
    "Je n'ai jamais ressenti une émotion pure et sincère pour quelqu'un.",
  ],
  duo_spicy: [
    "Je n'ai jamais ressenti une tension sexuelle palpable avec quelqu'un.",
    "Je n'ai jamais eu envie d'embrasser quelqu'un dès le premier regard.",
    "Je n'ai jamais flirté ouvertement avec quelqu'un qui me plaisait vraiment.",
    "Je n'ai jamais eu un moment de séduction intense et évident.",
    "Je n'ai jamais ressenti une attirance physique irrésistible.",
    "Je n'ai jamais voulu que quelqu'un me touche immédiatement.",
    "Je n'ai jamais eu un regard qui en disait long avec quelqu'un.",
    "Je n'ai jamais ressenti des frissons en pensant à quelqu'un.",
    "Je n'ai jamais voulu rapprocher mon corps de celui de quelqu'un.",
    "Je n'ai jamais eu une conversation à double sens vraiment claire.",
    "Je n'ai jamais ressenti une chimie évidente et électrique.",
    "Je n'ai jamais voulu être seul(e) dans une pièce avec quelqu'un.",
    "Je n'ai jamais eu des pensées suggestives sur quelqu'un en sa présence.",
    "Je n'ai jamais ressenti une envie pressante de toucher quelqu'un.",
    "Je n'ai jamais voulu séduire quelqu'un de manière évidente.",
    "Je n'ai jamais eu un contact visuel prolongé chargé de désir.",
    "Je n'ai jamais ressenti mon cœur battre plus vite face à quelqu'un.",
    "Je n'ai jamais voulu que quelqu'un devine mes pensées coquines.",
    "Je n'ai jamais eu un moment où l'air devenait lourd de désir.",
    "Je n'ai jamais ressenti une excitation rien qu'en pensant à quelqu'un.",
    "Je n'ai jamais voulu provoquer quelqu'un de manière subtile.",
    "Je n'ai jamais eu une conversation qui frôlait la limite de l'explicite.",
    "Je n'ai jamais ressenti une attraction magnétique vers quelqu'un.",
    "Je n'ai jamais voulu que quelqu'un fasse le premier pas.",
    "Je n'ai jamais eu envie de franchir une limite avec quelqu'un.",
    "Je n'ai jamais ressenti une alchimie physique immédiate.",
    "Je n'ai jamais voulu qu'un simple regard se transforme en plus.",
    "Je n'ai jamais eu une tension non résolue qui me rendait fou/folle.",
    "Je n'ai jamais ressenti un désir brûlant pour quelqu'un.",
    "Je n'ai jamais voulu qu'une soirée se termine autrement.",
  ],
  duo_fun: [
    "Je n'ai jamais eu un moment super gênant avec quelqu'un que j'aimais bien.",
    "Je n'ai jamais ri jusqu'aux larmes avec quelqu'un.",
    "Je n'ai jamais fait une blague nulle pour faire rire quelqu'un.",
    "Je n'ai jamais eu un fou rire incontrôlable au mauvais moment.",
    "Je n'ai jamais fait semblant de trouver une blague drôle.",
    "Je n'ai jamais eu un surnom ridicule donné par quelqu'un.",
    "Je n'ai jamais taquiné quelqu'un jusqu'à ce qu'il/elle devienne rouge.",
    "Je n'ai jamais eu un moment awkward lors d'un premier rencard.",
    "Je n'ai jamais fait une grimace ridicule pour faire sourire quelqu'un.",
    "Je n'ai jamais eu un incident embarrassant devant quelqu'un que j'aimais bien.",
    "Je n'ai jamais raté une tentative de séduction de manière comique.",
    "Je n'ai jamais eu un moment où je ne savais absolument pas quoi dire.",
    "Je n'ai jamais fait une gaffe monumentale devant quelqu'un.",
    "Je n'ai jamais eu un silence gênant interminable.",
    "Je n'ai jamais fait tomber quelque chose de manière embarrassante.",
    "Je n'ai jamais eu un mot qui est sorti complètement de travers.",
    "Je n'ai jamais raté un high five de manière gênante.",
    "Je n'ai jamais eu un moment de confusion totale.",
    "Je n'ai jamais fait une blague qui n'a fait rire personne.",
    "Je n'ai jamais eu un problème technique embarrassant (braguette, etc).",
    "Je n'ai jamais trébuché ou failli tomber devant quelqu'un.",
    "Je n'ai jamais eu de la nourriture coincée dans les dents sans m'en rendre compte.",
    "Je n'ai jamais fait une imitation ridicule pour amuser quelqu'un.",
    "Je n'ai jamais eu un malentendu vraiment drôle.",
    "Je n'ai jamais raté complètement un compliment.",
    "Je n'ai jamais eu un moment de second-hand embarrassment.",
    "Je n'ai jamais fait une tentative de flirt vraiment maladroite.",
    "Je n'ai jamais eu un blanc total au milieu d'une conversation.",
    "Je n'ai jamais fait rire quelqu'un sans faire exprès.",
    "Je n'ai jamais eu un moment cringe que je repense encore.",
  ],
  duo_honest: [
    "Je n'ai jamais eu peur de montrer mes vraies émotions à quelqu'un.",
    "Je n'ai jamais partagé une peur profonde avec quelqu'un.",
    "Je n'ai jamais pleuré devant quelqu'un que je connaissais à peine.",
    "Je n'ai jamais avoué quelque chose que je n'avais jamais dit à personne.",
    "Je n'ai jamais ressenti une vulnérabilité totale avec quelqu'un.",
    "Je n'ai jamais partagé mes insécurités les plus profondes.",
    "Je n'ai jamais eu une conversation qui m'a fait remettre en question ma vie.",
    "Je n'ai jamais admis mes défauts les plus honteux à quelqu'un.",
    "Je n'ai jamais parlé de mes regrets les plus lourds.",
    "Je n'ai jamais eu peur d'être jugé(e) en me confiant.",
    "Je n'ai jamais partagé un secret que je gardais depuis des années.",
    "Je n'ai jamais ressenti un soulagement après m'être confié(e).",
    "Je n'ai jamais admis que j'avais tort dans une situation importante.",
    "Je n'ai jamais parlé de mes échecs les plus douloureux.",
    "Je n'ai jamais partagé mes rêves les plus fous sans avoir peur du ridicule.",
    "Je n'ai jamais eu une conversation honnête qui a tout changé.",
    "Je n'ai jamais admis mes doutes sur moi-même.",
    "Je n'ai jamais partagé ce qui me fait vraiment peur dans la vie.",
    "Je n'ai jamais avoué quelque chose que j'avais caché par honte.",
    "Je n'ai jamais ressenti une libération en disant ma vérité.",
    "Je n'ai jamais admis mes faiblesses les plus profondes.",
    "Je n'ai jamais partagé ce qui me rend vraiment triste.",
    "Je n'ai jamais eu peur qu'on me rejette après m'être ouvert(e).",
    "Je n'ai jamais avoué ce que je ressentais vraiment pour quelqu'un.",
    "Je n'ai jamais partagé mes pensées les plus sombres.",
    "Je n'ai jamais ressenti un poids se lever après une confession.",
    "Je n'ai jamais admis que j'avais besoin d'aide.",
    "Je n'ai jamais partagé mes blessures émotionnelles les plus profondes.",
    "Je n'ai jamais eu une conversation qui m'a fait pleurer de soulagement.",
    "Je n'ai jamais ressenti une connexion profonde après m'être confié(e).",
  ],
};

const ALL_CATEGORIES: NhiCategoryId[] = [
  "basic",
  "spicy",
  "hot",
  "hardcore",
  "gross",
  "illicit",
  "travel",
  "work_school",
  "online",
  "couple",
];

const ALL_DUO_MODES: DuoModeId[] = [
  "duo_soft",
  "duo_spicy",
  "duo_fun",
  "duo_honest",
];

const CATEGORY_META: {
  id: NhiCategoryId;
  label: string;
  accent: string;
  shadow: string;
}[] = [
  {
    id: "basic",
    label: "Basic 🍺",
    accent: "from-sky-500 to-cyan-500",
    shadow: "shadow-sky-500/40",
  },
  {
    id: "spicy",
    label: "Spicy 🔥",
    accent: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/40",
  },
  {
    id: "hot",
    label: "Hot 18+ 💋",
    accent: "from-fuchsia-500 to-rose-500",
    shadow: "shadow-fuchsia-500/40",
  },
  {
    id: "hardcore",
    label: "Hardcore 🤯",
    accent: "from-violet-500 to-indigo-500",
    shadow: "shadow-violet-500/40",
  },
  {
    id: "gross",
    label: "Trash 🤢",
    accent: "from-lime-500 to-emerald-500",
    shadow: "shadow-lime-500/40",
  },
  {
    id: "illicit",
    label: "Illicit 🚫",
    accent: "from-red-500 to-orange-500",
    shadow: "shadow-red-500/40",
  },
  {
    id: "travel",
    label: "Travel ✈️",
    accent: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/40",
  },
  {
    id: "work_school",
    label: "Work/School 📚",
    accent: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/40",
  },
  {
    id: "online",
    label: "Online 💻",
    accent: "from-blue-500 to-sky-500",
    shadow: "shadow-blue-500/40",
  },
  {
    id: "couple",
    label: "Couple 💞",
    accent: "from-rose-500 to-pink-500",
    shadow: "shadow-rose-500/40",
  },
];

const DUO_META: {
  id: DuoModeId;
  label: string;
  accent: string;
  shadow: string;
}[] = [
  {
    id: "duo_soft",
    label: "Duo Soft 💫",
    accent: "from-blue-400 to-pink-400",
    shadow: "shadow-blue-400/40",
  },
  {
    id: "duo_spicy",
    label: "Duo Spicy 🔥",
    accent: "from-rose-500 to-fuchsia-500",
    shadow: "shadow-rose-500/40",
  },
  {
    id: "duo_fun",
    label: "Duo Fun 😁",
    accent: "from-yellow-400 to-orange-400",
    shadow: "shadow-yellow-400/40",
  },
  {
    id: "duo_honest",
    label: "Duo Honest 🫣",
    accent: "from-indigo-500 to-violet-500",
    shadow: "shadow-indigo-500/40",
  },
];

type DeckCard =
  | { type: "prompt"; category: NhiCategoryId; text: string }
  | { type: "duo_prompt"; duoType: DuoModeId; text: string }
  | { type: "blank"; id: string };

function buildDeck(
  duoMode: boolean,
  categories: NhiCategoryId[],
  duoModes: DuoModeId[],
  includeBlanks: boolean
): DeckCard[] {
  const cards: DeckCard[] = [];

  if (duoMode) {
    // Duo mode: use only duo prompts
    duoModes.forEach((duoType) => {
      const prompts = PROMPTS_DUO[duoType] ?? [];
      prompts.forEach((text) => cards.push({ type: "duo_prompt", duoType, text }));
    });
  } else {
    // Classic mode: use categories + optional blanks
    categories.forEach((cat) => {
      const prompts = PROMPTS_BY_CATEGORY[cat] ?? [];
      prompts.forEach((text) => cards.push({ type: "prompt", category: cat, text }));
    });

    if (includeBlanks) {
      const BLANK_COUNT = 8;
      for (let i = 0; i < BLANK_COUNT; i++) {
        cards.push({
          type: "blank",
          id: `blank-${i}-${Math.random().toString(16).slice(2)}`,
        });
      }
    }
  }

  return cards.sort(() => Math.random() - 0.5);
}

function getCategoryAccent(category: NhiCategoryId | "custom") {
  switch (category) {
    case "basic":
      return "from-sky-500/10 via-slate-900 to-sky-900/60 border-sky-500/40";
    case "spicy":
      return "from-pink-500/15 via-slate-900 to-rose-900/60 border-pink-500/40";
    case "hot":
      return "from-fuchsia-500/20 via-slate-900 to-rose-900/70 border-fuchsia-400/50";
    case "hardcore":
      return "from-violet-500/20 via-slate-900 to-indigo-900/70 border-violet-400/50";
    case "gross":
      return "from-lime-500/15 via-slate-900 to-emerald-900/60 border-lime-400/50";
    case "illicit":
      return "from-red-500/20 via-slate-900 to-orange-900/70 border-red-400/50";
    case "travel":
      return "from-emerald-500/15 via-slate-900 to-teal-900/60 border-emerald-400/50";
    case "work_school":
      return "from-amber-500/15 via-slate-900 to-orange-900/60 border-amber-400/50";
    case "online":
      return "from-blue-500/15 via-slate-900 to-sky-900/60 border-blue-400/50";
    case "couple":
      return "from-rose-500/20 via-slate-900 to-pink-900/70 border-rose-400/50";
    default:
      return "from-slate-700/20 via-slate-900 to-slate-900 border-slate-500/40";
  }
}

function getDuoAccent(duoType: DuoModeId) {
  switch (duoType) {
    case "duo_soft":
      return "from-blue-400/20 via-slate-900 to-pink-900/60 border-blue-400/50";
    case "duo_spicy":
      return "from-rose-500/20 via-slate-900 to-fuchsia-900/70 border-rose-400/50";
    case "duo_fun":
      return "from-yellow-400/20 via-slate-900 to-orange-900/60 border-yellow-400/50";
    case "duo_honest":
      return "from-indigo-500/20 via-slate-900 to-violet-900/70 border-indigo-400/50";
  }
}

export default function NeverHaveIEverPage() {
  // Duo mode state
  const [duoMode, setDuoMode] = useState(false);
  const [selectedDuoModes, setSelectedDuoModes] = useState<DuoModeId[]>([
    "duo_soft",
  ]);

  // Classic mode state
  const [selectedCategories, setSelectedCategories] = useState<NhiCategoryId[]>([
    "basic",
  ]);
  const [includeCustomBlanks, setIncludeCustomBlanks] = useState(false);

  // Deck state
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [cursor, setCursor] = useState(0);
  const [history, setHistory] = useState<
    { text: string; category: NhiCategoryId | DuoModeId | "custom" }[]
  >([]);

  // Blank modal state
  const [isBlankModalOpen, setIsBlankModalOpen] = useState(false);
  const [blankDraft, setBlankDraft] = useState("");
  const [overridePrompt, setOverridePrompt] = useState<string | null>(null);

  // Rebuild deck when duoMode, categories, duoModes, or blanks change
  useEffect(() => {
    const newDeck = buildDeck(
      duoMode,
      selectedCategories,
      selectedDuoModes,
      includeCustomBlanks
    );
    setDeck(newDeck);
    setCursor(0);
    setHistory([]);
    setOverridePrompt(null);
  }, [duoMode, selectedCategories, selectedDuoModes, includeCustomBlanks]);

  // Open blank modal when hitting a blank card
  useEffect(() => {
    const card = deck[cursor];
    if (card && card.type === "blank" && !overridePrompt) {
      setBlankDraft("");
      setIsBlankModalOpen(true);
    }
  }, [cursor, deck, overridePrompt]);

  function handleToggleCategory(catId: NhiCategoryId) {
    setSelectedCategories((prev) => {
      if (prev.includes(catId)) {
        const next = prev.filter((c) => c !== catId);
        return next.length > 0 ? next : prev;
      }
      return [...prev, catId];
    });
  }

  function handleToggleDuoMode(duoId: DuoModeId) {
    setSelectedDuoModes((prev) => {
      if (prev.includes(duoId)) {
        const next = prev.filter((d) => d !== duoId);
        return next.length > 0 ? next : prev;
      }
      return [...prev, duoId];
    });
  }

  function handleToggleAll() {
    if (selectedCategories.length === ALL_CATEGORIES.length) {
      setSelectedCategories(["basic"]);
    } else {
      setSelectedCategories([...ALL_CATEGORIES]);
    }
  }

  function handleToggleAllDuo() {
    if (selectedDuoModes.length === ALL_DUO_MODES.length) {
      setSelectedDuoModes(["duo_soft"]);
    } else {
      setSelectedDuoModes([...ALL_DUO_MODES]);
    }
  }

  function handleBlankConfirm() {
    if (blankDraft.trim()) {
      setOverridePrompt(blankDraft.trim());
      setIsBlankModalOpen(false);
    }
  }

  function nextPrompt() {
    const currentCard = deck[cursor];
    let currentPromptText: string | null = null;
    let categoryForHistory: NhiCategoryId | DuoModeId | "custom" = "custom";

    if (currentCard?.type === "prompt") {
      currentPromptText = currentCard.text;
      categoryForHistory = currentCard.category;
    } else if (currentCard?.type === "duo_prompt") {
      currentPromptText = currentCard.text;
      categoryForHistory = currentCard.duoType;
    } else if (currentCard?.type === "blank" && overridePrompt) {
      currentPromptText = overridePrompt;
      categoryForHistory = "custom";
    }

    if (currentPromptText) {
      setHistory((prev) =>
        [{ text: currentPromptText!, category: categoryForHistory }, ...prev].slice(
          0,
          8
        )
      );
    }

    setOverridePrompt(null);

    if (cursor + 1 >= deck.length) {
      resetDeck();
    } else {
      setCursor((c) => c + 1);
    }
  }

  function resetDeck() {
    const newDeck = buildDeck(
      duoMode,
      selectedCategories,
      selectedDuoModes,
      includeCustomBlanks
    );
    setDeck(newDeck);
    setCursor(0);
    setHistory([]);
    setOverridePrompt(null);
  }

  const currentCard = deck[cursor];
  let currentPromptText: string | null = null;
  let categoryForStyle: NhiCategoryId | DuoModeId | "custom" = "custom";

  if (currentCard?.type === "prompt") {
    currentPromptText = currentCard.text;
    categoryForStyle = currentCard.category;
  } else if (currentCard?.type === "duo_prompt") {
    currentPromptText = currentCard.text;
    categoryForStyle = currentCard.duoType;
  } else if (currentCard?.type === "blank") {
    currentPromptText = overridePrompt;
    categoryForStyle = "custom";
  }

  const accentClasses =
    categoryForStyle && categoryForStyle.startsWith("duo_")
      ? getDuoAccent(categoryForStyle as DuoModeId)
      : getCategoryAccent(categoryForStyle as NhiCategoryId | "custom");

  return (
    <FadeIn>
      <div className="px-4 md:px-0" style={{ marginBottom: "1rem" }}>
        <H1>Never Have I Ever</H1>
        <Sub>
          Version mobile du classique « Je n'ai jamais ». Lis la phrase. Si tu l'as
          déjà fait, bois.
        </Sub>
      </div>

      <div className="px-4 md:px-0">
        {/* Duo Mode Toggle */}
        <div className="mb-4">
          <button
            onClick={() => setDuoMode((v) => !v)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out ${
              duoMode
                ? "scale-[1.05] border-white/20 bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg shadow-blue-500/40"
                : "border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-300"
            }`}
            style={
              duoMode
                ? {
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                  }
                : undefined
            }
          >
            Duo Mode 💙
          </button>
        </div>

        {/* Classic Theme Selector */}
        {!duoMode && (
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={handleToggleAll}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                selectedCategories.length === ALL_CATEGORIES.length
                  ? "scale-[1.04] border-white/20 bg-fuchsia-500/30 text-fuchsia-100 shadow-lg shadow-fuchsia-500/40"
                  : "border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-300"
              }`}
              style={
                selectedCategories.length === ALL_CATEGORIES.length
                  ? {
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    }
                  : undefined
              }
            >
              All mix 🎲
            </button>

            {CATEGORY_META.map((cat) => {
              const active = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => handleToggleCategory(cat.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                    active
                      ? `scale-[1.04] border-white/20 bg-gradient-to-r ${cat.accent} text-white shadow-lg ${cat.shadow}`
                      : "border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-300"
                  }`}
                  style={
                    active
                      ? {
                          textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                        }
                      : undefined
                  }
                >
                  {cat.label}
                </button>
              );
            })}

            <button
              onClick={() => setIncludeCustomBlanks((v) => !v)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                includeCustomBlanks
                  ? "scale-[1.04] border-white/20 bg-emerald-500/30 text-emerald-100 shadow-lg shadow-emerald-500/40"
                  : "border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-300"
              }`}
              style={
                includeCustomBlanks
                  ? {
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    }
                  : undefined
              }
            >
              Free theme ✏️
            </button>
          </div>
        )}

        {/* Duo Theme Selector */}
        {duoMode && (
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={handleToggleAllDuo}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                selectedDuoModes.length === ALL_DUO_MODES.length
                  ? "scale-[1.04] border-white/20 bg-fuchsia-500/30 text-fuchsia-100 shadow-lg shadow-fuchsia-500/40"
                  : "border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-300"
              }`}
              style={
                selectedDuoModes.length === ALL_DUO_MODES.length
                  ? {
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    }
                  : undefined
              }
            >
              All Duo 💙
            </button>

            {DUO_META.map((duo) => {
              const active = selectedDuoModes.includes(duo.id);
              return (
                <button
                  key={duo.id}
                  onClick={() => handleToggleDuoMode(duo.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                    active
                      ? `scale-[1.05] border-white/20 bg-gradient-to-r ${duo.accent} text-white shadow-lg ${duo.shadow}`
                      : "border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-300"
                  }`}
                  style={
                    active
                      ? {
                          textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                        }
                      : undefined
                  }
                >
                  {duo.label}
                </button>
              );
            })}
          </div>
        )}

        <Card>
          <div className="text-center">
            {/* Premium card */}
            <motion.div
              key={cursor}
              initial={{ opacity: 0, scale: 0.95, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative mx-auto mb-6 max-w-md rounded-[32px] border-2 bg-gradient-to-br ${accentClasses} p-6 shadow-2xl shadow-black/40`}
            >
              <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
                  {duoMode ? "DUO 💙" : "PHRASE"}
                </span>
                <span className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] text-slate-200">
                  {categoryForStyle === "custom"
                    ? "Free theme ✏️"
                    : categoryForStyle.startsWith("duo_")
                      ? DUO_META.find((d) => d.id === categoryForStyle)?.label ?? ""
                      : CATEGORY_META.find((c) => c.id === categoryForStyle)?.label ??
                        ""}
                </span>
              </div>

              <div className="mt-4 flex min-h-[96px] items-center justify-center px-2 text-center text-lg font-medium leading-relaxed text-slate-50">
                {currentPromptText ??
                  'Clique sur "Nouvelle phrase" pour commencer.'}
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Si tu l'as déjà fait, tu bois. 🍻
              </p>
            </motion.div>

            {/* Actions */}
            <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={nextPrompt}
                disabled={!currentPromptText}
                className="w-full max-w-[220px] rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                Nouvelle phrase
              </button>
              <button
                onClick={resetDeck}
                className="text-sm text-slate-400 hover:text-slate-200"
              >
                Remettre le deck à zéro
              </button>
            </div>

            {/* Progress */}
            <p className="mb-4 text-xs text-slate-500">
              Phrase {cursor + 1} / {deck.length}
            </p>

            {/* History */}
            {history.length > 0 && (
              <div className="mt-6 border-t border-slate-700/50 pt-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Historique
                </h3>
                <div className="space-y-2">
                  {history.map((item, i) => {
                    const catLabel =
                      item.category === "custom"
                        ? "Free theme ✏️"
                        : item.category.startsWith("duo_")
                          ? DUO_META.find((d) => d.id === item.category)?.label +
                            " 💙"
                          : CATEGORY_META.find((c) => c.id === item.category)
                              ?.label ?? "";
                    return (
                      <div
                        key={i}
                        className="rounded-lg bg-slate-800/50 px-3 py-2 text-left"
                      >
                        <p className="text-xs text-slate-300">{item.text}</p>
                        <p className="mt-1 text-[10px] text-slate-500">
                          {catLabel}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Blank Card Modal */}
      {isBlankModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setIsBlankModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-2xl border border-slate-600/70 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-lg font-semibold text-slate-100">
              Free theme ✏️
            </h2>
            <p className="mb-4 text-sm text-slate-400">
              Invente ton propre "Never have I ever". Si quelqu'un l'a déjà fait, il boit.
            </p>
            <textarea
              value={blankDraft}
              onChange={(e) => setBlankDraft(e.target.value)}
              rows={3}
              placeholder="Exemple : Je n'ai jamais..."
              className="mb-3 w-full rounded-xl border border-slate-600/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/60"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setIsBlankModalOpen(false)}
                className="text-sm text-slate-400 hover:text-slate-200"
              >
                Annuler
              </button>
              <button
                onClick={handleBlankConfirm}
                disabled={!blankDraft.trim()}
                className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirmer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </FadeIn>
  );
}
