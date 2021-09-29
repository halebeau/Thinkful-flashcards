import React, { useEffect } from "react"
import { useRouteMatch } from "react-router"
import { readCard } from "../../../utils/api"
import CardForm from "../CardForm"
import Breadcrumb from "./Breadcrumb"

const EditCard = ( { deck, card, setCard } ) => {

  // Hook to get card id from route parameters
  const { cardId } = useRouteMatch().params

  // Hook to load card using the api call readCard
  useEffect(() => {
    const abortController = new AbortController()
    const abortSignal = abortController.signal
    const cleanup = () => abortController.abort

    const loadCard = async () => {
      try {
        const cardData = await readCard(cardId, abortSignal)
        setCard(cardData)
      } catch (error) {
        if (error.name === "Aborted") {console.log("Aborted")}
        else {throw error}
      }
    }

    loadCard()

    return cleanup

  }, [cardId, setCard])

  return (
    <div className="container">
      <div className="col">
        {/* Breadcrumb style nav bar */}
        <Breadcrumb deck={deck} card={card} />
        <h1>Edit Card</h1>
        {/* Card form: receives card from state via api hook */}
        <CardForm deck={deck} card={card} setCard={setCard}/>
      </div>
    </div>
    )
}

export default EditCard