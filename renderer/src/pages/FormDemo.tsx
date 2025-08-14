import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { CheckCircle, AlertCircle, Loader2, FileText, User, Mail, Phone, Globe, CreditCard } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { BirthDatePicker } from '@/components/ui/birth-date-picker'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'

// Schéma de validation Zod complet
const formSchema = z.object({
  // Informations personnelles
  firstName: z.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom ne peut contenir que des lettres'),
  
  lastName: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres'),
  
  email: z.string()
    .email('Adresse email invalide')
    .min(1, 'L\'email est requis'),
  
  phone: z.string()
    .regex(/^(\+33|0)[1-9](\d{8})$/, 'Numéro de téléphone français invalide')
    .optional()
    .or(z.literal('')),
  
  birthDate: z.date({
    required_error: 'La date de naissance est requise',
  }).refine(date => {
    const today = new Date()
    const minAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    const maxAge = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())
    return date >= minAge && date <= maxAge
  }, 'Vous devez avoir entre 13 et 120 ans'),

  // Adresse
  address: z.string()
    .min(5, 'L\'adresse doit contenir au moins 5 caractères')
    .max(200, 'L\'adresse ne peut pas dépasser 200 caractères'),
  
  city: z.string()
    .min(2, 'La ville doit contenir au moins 2 caractères')
    .max(100, 'La ville ne peut pas dépasser 100 caractères'),
  
  postalCode: z.string()
    .regex(/^[0-9]{5}$/, 'Code postal français invalide (5 chiffres)'),
  
  country: z.string()
    .min(1, 'Le pays est requis'),

  // Préférences
  accountType: z.enum(['personal', 'business', 'nonprofit'], {
    required_error: 'Le type de compte est requis',
  }),
  
  interests: z.array(z.string()).min(1, 'Sélectionnez au moins un centre d\'intérêt'),
  
  newsletter: z.boolean().default(false),
  
  notifications: z.boolean().default(true),
  
  // Commentaires
  comments: z.string()
    .max(500, 'Les commentaires ne peuvent pas dépasser 500 caractères')
    .optional(),
  
  // Conditions
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions d\'utilisation',
  }),
  
  acceptPrivacy: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
})

type FormDataType = z.infer<typeof formSchema>

const countries = [
  { value: 'FR', label: 'France' },
  { value: 'BE', label: 'Belgique' },
  { value: 'CH', label: 'Suisse' },
  { value: 'CA', label: 'Canada' },
  { value: 'US', label: 'États-Unis' },
]

const interestOptions = [
  { id: 'technology', label: 'Technologie' },
  { id: 'design', label: 'Design' },
  { id: 'business', label: 'Business' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'development', label: 'Développement' },
  { id: 'ai', label: 'Intelligence Artificielle' },
]

export default function FormDemo() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      accountType: 'personal',
      interests: [],
      newsletter: false,
      notifications: true,
      comments: '',
      acceptTerms: false,
      acceptPrivacy: false,
    },
    mode: 'onChange', // Validation en temps réel
  })

  const watchedInterests = watch('interests')
  const watchedBirthDate = watch('birthDate')

  const onSubmit = async (data: FormDataType) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulation d'une réponse API
      console.log('Données du formulaire:', data)
      
      setSubmitStatus('success')
      
      // Optionnel: réinitialiser le formulaire après succès
      // reset()
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestChange = (interestId: string, checked: boolean) => {
    const currentInterests = watchedInterests || []
    if (checked) {
      setValue('interests', [...currentInterests, interestId], { shouldValidate: true })
    } else {
      setValue('interests', currentInterests.filter(id => id !== interestId), { shouldValidate: true })
    }
  }

  const getFieldStatus = (fieldName: keyof FormDataType) => {
    if (errors[fieldName]) return 'error'
    return 'default'
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold">{t('pages.formDemo.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('pages.formDemo.description')}
        </p>
      </div>

      {/* Indicateurs de bonnes pratiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            {t('pages.formDemo.bestPractices.title')}
          </CardTitle>
          <CardDescription>
            {t('pages.formDemo.bestPractices.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">{t('pages.formDemo.bestPractices.implemented')}</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  React Hook Form + Zod validation
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {t('pages.formDemo.bestPractices.features.realTimeValidation')}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {t('pages.formDemo.bestPractices.features.visualFeedback')}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {t('pages.formDemo.bestPractices.features.accessibility')}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {t('pages.formDemo.bestPractices.features.typeScript')}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">{t('pages.formDemo.bestPractices.advantages')}</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• {t('pages.formDemo.bestPractices.benefits.performance')}</div>
                <div>• {t('pages.formDemo.bestPractices.benefits.ux')}</div>
                <div>• {t('pages.formDemo.bestPractices.benefits.maintenance')}</div>
                <div>• {t('pages.formDemo.bestPractices.benefits.validation')}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire principal */}
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('pages.formDemo.sections.personalInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {t('pages.formDemo.fields.firstName')} *
                </Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className={getFieldStatus('firstName') === 'error' ? 'border-red-500' : ''}
                  placeholder={t('pages.formDemo.placeholders.firstName')}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {t('pages.formDemo.fields.lastName')} *
                </Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className={getFieldStatus('lastName') === 'error' ? 'border-red-500' : ''}
                  placeholder={t('pages.formDemo.placeholders.lastName')}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {t('pages.formDemo.fields.email')} *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`pl-10 ${getFieldStatus('email') === 'error' ? 'border-red-500' : ''}`}
                  placeholder={t('pages.formDemo.placeholders.email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  {t('pages.formDemo.fields.phone')}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    {...register('phone')}
                    className={`pl-10 ${getFieldStatus('phone') === 'error' ? 'border-red-500' : ''}`}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  {t('pages.formDemo.fields.birthDate')} *
                </Label>
                <BirthDatePicker
                  date={watchedBirthDate}
                  onDateChange={(date) => {
                    if (date) {
                      setValue('birthDate', date, { shouldValidate: true })
                    }
                  }}
                  placeholder={t('pages.formDemo.placeholders.birthDate')}
                  className={getFieldStatus('birthDate') === 'error' ? 'border-red-500' : ''}
                />
                {errors.birthDate && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.birthDate.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Adresse */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('pages.formDemo.sections.address')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">
                {t('pages.formDemo.fields.address')} *
              </Label>
              <Input
                id="address"
                {...register('address')}
                className={getFieldStatus('address') === 'error' ? 'border-red-500' : ''}
                placeholder={t('pages.formDemo.placeholders.address')}
              />
              {errors.address && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">
                  {t('pages.formDemo.fields.city')} *
                </Label>
                <Input
                  id="city"
                  {...register('city')}
                  className={getFieldStatus('city') === 'error' ? 'border-red-500' : ''}
                  placeholder={t('pages.formDemo.placeholders.city')}
                />
                {errors.city && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">
                  {t('pages.formDemo.fields.postalCode')} *
                </Label>
                <Input
                  id="postalCode"
                  {...register('postalCode')}
                  className={getFieldStatus('postalCode') === 'error' ? 'border-red-500' : ''}
                  placeholder="75001"
                />
                {errors.postalCode && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.postalCode.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  {t('pages.formDemo.fields.country')} *
                </Label>
                <Select onValueChange={(value) => setValue('country', value, { shouldValidate: true })}>
                  <SelectTrigger className={getFieldStatus('country') === 'error' ? 'border-red-500' : ''}>
                    <SelectValue placeholder={t('pages.formDemo.placeholders.country')} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Préférences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              {t('pages.formDemo.sections.preferences')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>{t('pages.formDemo.fields.accountType')} *</Label>
              <RadioGroup
                onValueChange={(value) => setValue('accountType', value as any, { shouldValidate: true })}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal">{t('pages.formDemo.accountTypes.personal')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business">{t('pages.formDemo.accountTypes.business')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nonprofit" id="nonprofit" />
                  <Label htmlFor="nonprofit">{t('pages.formDemo.accountTypes.nonprofit')}</Label>
                </div>
              </RadioGroup>
              {errors.accountType && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.accountType.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label>{t('pages.formDemo.fields.interests')} *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest.id}
                      checked={watchedInterests?.includes(interest.id) || false}
                      onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                    />
                    <Label htmlFor={interest.id} className="text-sm font-normal">
                      {interest.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.interests && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.interests.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newsletter">{t('pages.formDemo.fields.newsletter')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('pages.formDemo.descriptions.newsletter')}
                  </p>
                </div>
                <Switch
                  id="newsletter"
                  onCheckedChange={(checked) => setValue('newsletter', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">{t('pages.formDemo.fields.notifications')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('pages.formDemo.descriptions.notifications')}
                  </p>
                </div>
                <Switch
                  id="notifications"
                  defaultChecked
                  onCheckedChange={(checked) => setValue('notifications', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commentaires */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('pages.formDemo.sections.additional')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="comments">
                {t('pages.formDemo.fields.comments')}
              </Label>
              <Textarea
                id="comments"
                {...register('comments')}
                className={`resize-none ${
                  getFieldStatus('comments') === 'error' ? 'border-red-500' : ''
                }`}
                placeholder={t('pages.formDemo.placeholders.comments')}
                rows={4}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{t('pages.formDemo.maxCharacters', { max: 500 })}</span>
                <span>{watch('comments')?.length || 0}/500</span>
              </div>
              {errors.comments && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.comments.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conditions */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  onCheckedChange={(checked) => setValue('acceptTerms', checked as boolean, { shouldValidate: true })}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  {t('pages.formDemo.terms.accept')}{' '}
                  <a href="#" className="text-primary hover:underline">
                    {t('pages.formDemo.terms.conditions')}
                  </a>{' '}
                  *
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.acceptTerms.message}
                </p>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptPrivacy"
                  onCheckedChange={(checked) => setValue('acceptPrivacy', checked as boolean, { shouldValidate: true })}
                />
                <Label htmlFor="acceptPrivacy" className="text-sm">
                  {t('pages.formDemo.terms.acceptPrivacy')}{' '}
                  <a href="#" className="text-primary hover:underline">
                    {t('pages.formDemo.terms.privacy')}
                  </a>{' '}
                  *
                </Label>
              </div>
              {errors.acceptPrivacy && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.acceptPrivacy.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              {t('pages.formDemo.actions.reset')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => console.log('Current form data:', watch())}
            >
              {t('pages.formDemo.actions.preview')}
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Indicateur de validation */}
            <div className="flex items-center gap-2 text-sm">
              {isValid ? (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {t('pages.formDemo.validation.valid')}
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {t('pages.formDemo.validation.invalid')}
                </Badge>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('pages.formDemo.actions.submitting')}
                </>
              ) : (
                t('pages.formDemo.actions.submit')
              )}
            </Button>
          </div>
        </div>

        {/* Status de soumission */}
        {submitStatus === 'success' && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">{t('pages.formDemo.messages.success')}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {submitStatus === 'error' && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">{t('pages.formDemo.messages.error')}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  )
}
