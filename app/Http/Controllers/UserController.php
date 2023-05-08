<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users = User::orderBy('id','desc')->get();
        // return response(['users'=>$users]);
        // return response()->json(User::all());

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
     public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }  
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
         
        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

   public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name)
    {
        //
        //  $userId = User::where('name',$name)->get();
         $userId = User::where('name',$name)->pluck('id');
       

        return response()->json($userId);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, string $id)
    {
        //
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::where('id',$id)->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);    
        return response([
            'user' => $user
        ]);
       

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyUsers($id)
    {
         try {
             $ids = explode(",", $id);              
            User::destroy($ids);
            return response()->json([
                'message'=>"Uers Deleted successfully."
            ],200);

        } catch(\Exception $e) {
            report($e);
        }
   
    }
    public function destroy($id)
    {
        //
        $user = User::find($id);
        // return $user;
        $user->delete();
        // // dd($user);
        return response(['success'=>true]);
    }
}
