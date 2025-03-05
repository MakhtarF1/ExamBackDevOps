import jwt from "jsonwebtoken"

export const verifierAuth = (req, res, next) => {
  // Récupérer le token du header Authorization
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès non autorisé. Token manquant." })
  }

  const token = authHeader.split(" ")[1]

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Ajouter les informations de l'utilisateur à la requête
    req.utilisateur = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré." })
  }
}

export const verifierRole = (roles) => {
  return (req, res, next) => {
    if (!req.utilisateur) {
      return res.status(401).json({ message: "Accès non autorisé. Utilisateur non authentifié." })
    }

    if (!roles.includes(req.utilisateur.role)) {
      return res.status(403).json({ message: "Accès interdit. Vous n'avez pas les droits nécessaires." })
    }

    next()
  }
}

