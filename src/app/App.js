import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  CreateAccountPage,
  EmailConfirmationLanderPage,
  SignInPage,
  ProtectedRoute,
  useAuth,
} from '../auth';
import {
  PostAnOpportunityPage,
  PostAnOpportunityThankYouPage,
  OpportunitySearchPage,
  OpportunityDetailPage,
  OpportunityEditPage,
  OpportunityEditDetailsPage,
} from '../opportunities';
import {
  RestaurantDetailPage,
  SearchPage,
} from '../restaurants';
import {
  WriteAReviewPage,
} from '../reviews';
import {
  EditProfilePage,
  HomePage,
} from '../user';
import {
  CandidateSearchPage,
  CandidateDetailPage,
  CandidateEditPage,
  CandidateEditProfilePage,
} from '../candidates';
import './App.css';
import { TestPage } from '../test'
/*
  This is the main React component that we render the rest of
  of app's components inside of. In our app, we're using this
  component to hold the Router and all the different Routes our
  app supports.
*/
export function App() {
  const { isLoading, user } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path='/sign-in'>
          <SignInPage />
        </Route>
        <Route path='/test'>
          <TestPage />
        </Route>
        <Route path='/create-account'>
          <CreateAccountPage />
        </Route>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/edit-profile'>
          <EditProfilePage />
        </ProtectedRoute>
        <Route path='/email-confirmation/success'>
          <EmailConfirmationLanderPage success />
        </Route>
        <Route path='/email-confirmation/failure'>
          <EmailConfirmationLanderPage />
        </Route>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/' exact>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/search'>
          <SearchPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/candidate-search'>
          <CandidateSearchPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/candidate-edit'>
          <CandidateEditPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/candidate-profile-edit/:id'>
          <CandidateEditProfilePage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/candidates/:id'>
          <CandidateDetailPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/post-an-opportunity'>
          <PostAnOpportunityPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/opportunity/thank-you'>
          <PostAnOpportunityThankYouPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/view-opportunities'>
          <OpportunitySearchPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/opportunity/:id'>
          <OpportunityDetailPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/edit-opportunity'>
          <OpportunityEditPage />
        </ProtectedRoute>
        <ProtectedRoute isAuthed={!!user} isLoading={isLoading} path='/opportunity-edit-details/:id'>
          <OpportunityEditDetailsPage />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}
