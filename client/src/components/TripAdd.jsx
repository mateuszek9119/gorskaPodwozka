import React, { useState, useRef } from 'react'
import axios from 'axios'
import { MdClose } from "react-icons/md"
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { toast } from 'react-toastify'
import styles from '../css/tripAdd.module.css'

function TripAdd({ fetchTrips, handleCloseForm }) {
  const [showMiddleInput, setShowMiddleInput] = useState(false)
  const [step, setStep] = useState(1) // 1: Trasa, 2: Szczegóły, 3: Użytkownik
  const [textAreaIsFocused, setTextAreaIsFocused] = useState(false);
  const nodeRef = useRef(null) // 🔧 KLUCZ

  const [cityInput, setCityInput] = useState("")
  const [middleCities, setMiddleCities] = useState([])

  const [img, setImg] = useState(null)

  const [formTrip, setFormTrip] = useState({
    cityStart: "",
    cityEnd: "",
    dateStartTrip: "",
    dateEndTrip: "",
    userName: "",
    contactPhone: "",
    contactInsta: "",
    contactMessenger: "",
    description: ""
  })

  const minDate = new Date().toISOString().slice(0, 10)

  const isFormValid =
    formTrip.userName.trim() &&
    img !== null &&
    (
      formTrip.contactPhone.trim() ||
      formTrip.contactInsta.trim() ||
      formTrip.contactMessenger.trim()
    )

 
  const handleAddCity = () => {
    const trimmed = cityInput.trim();
    if (trimmed.length === 0) return;

    if (!middleCities.includes(trimmed)) {
      setMiddleCities([...middleCities, trimmed]);
    }

    setCityInput('');
    setShowMiddleInput(false);
} 

  const handleRemoveCity = (cityToRemove) => {
    setMiddleCities(prev => prev.filter(city => city !== cityToRemove))
  }

  const handleImageChange = (e) => {
    setImg(e.target.files[0])
  }

  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormTrip(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('cityStart', formTrip.cityStart)
    formData.append('cities', middleCities.join(','))
    formData.append('cityEnd', formTrip.cityEnd)
    formData.append('dateStartTrip', formTrip.dateStartTrip)
    formData.append('dateEndTrip', formTrip.dateEndTrip)
    formData.append('userName', formTrip.userName)
    formData.append('img', img)
    formData.append('contactPhone', formTrip.contactPhone)
    formData.append('contactInsta', formTrip.contactInsta)
    formData.append('contactMessenger', formTrip.contactMessenger)
    formData.append('description', formTrip.description)

    try {
      const data = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      })
      if (data.data.success) {
        toast.success("Przejazd dodany!")
        fetchTrips()
        setFormTrip({
          cityStart: "",
          cityEnd: "",
          dateStartTrip: "",
          dateEndTrip: "",
          userName: "",
          contactPhone: "",
          contactInsta: "",
          contactMessenger: "",
          description: ""
        })
        setMiddleCities([])
        setImg(null)
        handleCloseForm()
      }
    } catch (err) {
      console.log('Błąd:', err)
      toast.error("Wystąpił błąd podczas dodawania przejazdu.")
    }
  }

  const isCurrentStepValid =
    (step === 1 && formTrip.cityStart.trim() && formTrip.cityEnd.trim()) ||
    (step === 2 && formTrip.dateStartTrip.trim() && formTrip.dateEndTrip.trim())

  return (

    <div className={styles.formContainer}>

      <form onSubmit={handleUpload} method="post" encType="multipart/form-data">

        <div className={styles['form-header']}>

          {(step === 2 || step === 3) ? (
            <span className={styles['btn-back-top']} onClick={() => setStep(step - 1)}>← Wstecz</span>
          ) : (
            <span className={styles['btn-back-top']} /> // pusty element – żeby X nie przeskakiwał
          )}
          <div className={styles['close-btn']} onClick={handleCloseForm}><MdClose /></div>

        </div>

        {/* TUTAJ DODAJEMY DODATKOWY KONTENER DLA ANIMACJI */}
        <div className={styles.animationWrapper} ref={nodeRef}>

          <SwitchTransition mode="out-in">
            <CSSTransition
              key={step}
              timeout={200}
              classNames="step"
              unmountOnExit
              mountOnEnter
              nodeRef={nodeRef}
            >
              <div className={styles.stepContainer}>

                {step === 1 ? (
                  
                  <div className={styles.step}>
                  
                  {/* KROK 1 – TRASA */}


<div className={styles['floating-label']}>
  <input
    type="text"
    name="cityStart"
    onChange={handleOnChange}
    value={formTrip.cityStart}
    placeholder=" "
    required
  />
  <label>Skąd</label>
</div>

<div className={styles['floating-label']}>
  <input
    type="text"
    name="cityEnd"
    onChange={handleOnChange}
    value={formTrip.cityEnd}
    placeholder=" "
    required
  />
  <label>Dokąd</label>
</div>

<div className={styles['optional-cities']}>

  <p className={styles.middleCityDescription}>
    Miasta z których możesz kogoś zabrać <span className={styles.optionalAreaText}>(Opcjonalne)</span>
  </p>

  {showMiddleInput ? (
    <div className={styles['middle-city-panel']}>
      <div className={styles['city-line']}>
        <input
          type="text"
          style={{ width: '65%' }}
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Nazwa miejscowości"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddCity();
            }
          }}
        />

        {cityInput.trim().length > 0 && (
          <span
            className={styles['cityMiddleAdd']}
            role="button"
            tabIndex={0}
            onClick={handleAddCity}
            onKeyDown={(e) => e.key === "Enter" && handleAddCity()}
          >
           <span style={{  color: '#2a9d8f', fontSize: '1.5rem'}}>+</span> Dodaj
          </span>
        )}
      </div>
    </div>
  ) : (
    <div className={styles['middle-city-panel']} style={{ textAlign: 'left' }}>
      <span
        className={styles['add-middle-city']}
        onClick={() => setShowMiddleInput(true)}
        style={{
          display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              gap: '2%'
        }}
      >
        <span style={{color: '#2a9d8f', fontSize: '1.5rem'}}>+</span> Dodaj Miejscowość
      </span>
    </div>
  )}

  {middleCities.length > 0 && (
    <div className={styles['city-line-wrapper']} style={{ marginTop: '3vh' }}>
      {middleCities.map((city, index) => (
        <div key={index} className={`${styles['city-line']} ${styles['fade-in']}`}>
          <span
            className={styles['city-remove']}
            onClick={() => handleRemoveCity(city)}
          >
            ×
          </span>
          <span className={styles['city-label']}>📍 {city}</span>
        </div>
      ))}
    </div>
  )}

</div>


                  </div>
                ) : step === 2 ? (
                  <div className={styles.step}>
                    {/* KROK 2 – Informacje o Wyjeździe */}

                    <div className={styles['floating-label']}>
                      <input
                        type="date"
                        name="dateStartTrip"
                        min={minDate}
                        onChange={handleOnChange}
                        value={formTrip.dateStartTrip}
                        required
                      />
                      <label>Data wyjazdu</label>
                    </div>

                    <div className={styles['floating-label']}>
                      <input
                        type="date"
                        name="dateEndTrip"
                        min={minDate}
                        onChange={handleOnChange}
                        value={formTrip.dateEndTrip}
                        required
                      />
                      <label>Data powrotu</label>
                    </div>

                    <div className={styles['floating-label']}>
                      <textarea
                        name="description"
                        onChange={handleOnChange}
                        value={formTrip.description}
                        placeholder=' '
                        maxLength={400}
                        onFocus={() => setTextAreaIsFocused(true)}
                        onBlur={() => setTextAreaIsFocused(false)}
                      />
                      <label>
                          Dodatkowe informacje o podróży <span className={styles.optionalAreaText}>(Opcjonalne)</span>
                      </label>
                    </div>
                    {textAreaIsFocused &&
                      <div className={styles['char-counter']}>
                      Znaków:  {formTrip.description.length} / 400
                      </div>
                    }
                  </div>
                ) : (
                  <div className={styles.step}>
                    {/* KROK 3 – Informacje o Użytkowniku */}

                    <div className={styles['floating-label']}>
                      <input
                        type="text"
                        placeholder=' '
                        name="userName"
                        onChange={handleOnChange}
                        value={formTrip.userName}
                        required
                      />
                      <label>Twoje imię</label>
                    </div>


                    <div className={styles.buttonAddImageWrapper}>

                      {!img && <p style={{  color: '#2a9d8f', fontFamily: 'inherit' }}>
                        <strong>Twoje zdjęcie</strong>
                      </p>}
                      

                      <label htmlFor="file-upload" className={styles['fileUpload']}>
                        Wybierz zdjęcie
                      </label>

                      <input
                        id="file-upload"
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />

                      {img && (
                        <div className={styles.imagePreview}>
                          <img src={URL.createObjectURL(img)} alt="Podgląd" />
                        </div>
                      )}

                    </div>

                    {/* Kontakt*/}
                    
                    <div className={styles.contactPanel} style={{textAlign: 'left'}}>

                      <p style={{ fontSize: '1rem'  }}>
                        <strong style={{color: '#2a9d8f'}}>Kontakt do Ciebie</strong> <span className={styles.optionalAreaText}>(minimum jedno pole)</span>
                      </p>

                      <div className={styles.contact}>

                        <input                        
                          type="text"
                          name="contactPhone"
                          onChange={handleOnChange}
                          value={formTrip.contactPhone}
                          placeholder="Telefon / WhatsApp"
                        />
                        <input
                          type="text"
                          name="contactInsta"
                          onChange={handleOnChange}
                          value={formTrip.contactInsta}
                          placeholder="@instagram"
                        />
                        <input
                          type="text"
                          name="contactMessenger"
                          onChange={handleOnChange}
                          value={formTrip.contactMessenger}
                          placeholder='messenger / fb'
                        />

                      </div>
                    </div>

                    <div className={styles['btn-accept-trip-wrapper']}>
                      <button
                        type="submit"
                        className={`${styles.btn} ${styles['btn-accept-form']} ${isFormValid ? styles.show : styles.hide}`}
                        disabled={!isFormValid}
                      >
                        Dodaj przejazd
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </CSSTransition>
          </SwitchTransition>

        </div>

{step < 3 && (
  <div className={styles['btn-next-wrapper']}>
    <span
      role="button"
      tabIndex={0}
      className={`${styles['btn-next']} ${isCurrentStepValid ? styles.show : styles.hide}`}
      onClick={() => {
        if (isCurrentStepValid) {
          setStep(step + 1)
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && isCurrentStepValid) {
          setStep(step + 1)
        }
      }}
    >
      Dalej →
    </span>
  </div>
)}

  </form>

</div>
  )
}

export default TripAdd
